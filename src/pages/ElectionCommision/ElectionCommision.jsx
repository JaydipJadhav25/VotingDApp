
import { useEffect, useState } from "react"
import AnnounceWinner from "../../components/ElectionCommision/AnnounceWinner";
import DisplayResult from "../../components/ElectionCommision/DisplayResult"
import EmergencyDeclare from "../../components/ElectionCommision/EmergencyDeclare";
import VotingStatus from "../../components/ElectionCommision/VotingStatus"
import VotingTimePeriod from "../../components/ElectionCommision/VotingTimePeriod"
import { useWeb3State } from "../../hooks/useWeb3State";
import WalletRequiredState from "../../components/WalletRequiredState";
import { toast } from "sonner";

// import {toast} from "sonnar"

const ElectionCommision = ()=>{
      const[isElectionCommision , setIsElectionCommision] = useState(false);

  // const token = localStorage.getItem("token");
  const {  contractInstance , selectedAccount} = useWeb3State();
  //   const navigateTo = useNavigate()
  //   useEffect(()=>{
  //     if(!token){
  //       navigateTo("/")
  //     }
  //   },[navigateTo,token]);

  
  if (!selectedAccount || !selectedAccount) {

    return (
     <WalletRequiredState/>
    )
  }

  //to check use is electioncommision
  useEffect(() => {
  async function checkAuthorization() {
    if (!contractInstance || !selectedAccount) return;

    try {
      const electionCommisiorAddress =
        await contractInstance.electionCommission();

      console.log("Election Commission:", electionCommisiorAddress);
      console.log("Selected Account:", selectedAccount);

      const isAuthorized =
        electionCommisiorAddress.toLowerCase() ===
        selectedAccount.toLowerCase();

      console.log("Is Authorized:", isAuthorized);

      setIsElectionCommision(isAuthorized);

      toast.success("Success!");
    } catch (error) {
      console.log("Error:", error);
      toast.error("Check Election Commission Error!");
    }
  }

  checkAuthorization();
}, [contractInstance, selectedAccount]);


  return(
    <>
    {
      !isElectionCommision ? <> 
            <div className="w-full h-screen">
               <h1 className="text-center mt-6 text-red-500 font-extrabold">You are not Authorized Person !</h1>
            </div>
      </> :   <>
     <VotingStatus/>
     <br></br>
     <DisplayResult/>
     <br></br>
     <VotingTimePeriod/> 
     <br></br>
     <AnnounceWinner/>
     <br></br>
     <EmergencyDeclare/>
    </>
    }
    </>
  )
}
export default ElectionCommision;