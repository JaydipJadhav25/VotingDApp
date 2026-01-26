import { useEffect } from "react";
import WalletRequiredState from "../../components/WalletRequiredState";
import { useWeb3State } from "../../hooks/useWeb3State"
import { toast } from "sonner";

function GetVoterList() {
  

    //get contract instance
     const {  contractInstance } = useWeb3State();

     //check first contractinstace
    
    if(!contractInstance){
        return(
            <WalletRequiredState/>
        )
    }

    //use useeffect to fetch all list of voter
    useEffect(()=>{
    
        async function getAllVotersList(){
            try {
                
                const votersList = await contractInstance.getVoterList();
                console.log(votersList);
            } catch (error) {
                
                toast.error("to fetch voterslist Error!")

            }
        }
   
        getAllVotersList();
    },[])


  return (
    <div>GetVoterList</div>
  )
}

export default GetVoterList