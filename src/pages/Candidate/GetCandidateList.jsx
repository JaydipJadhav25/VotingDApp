import { useEffect } from "react";

import { toast } from "sonner";
import { useWeb3State } from "../../hooks/useWeb3State";
import WalletRequiredState from "../../components/WalletRequiredState";

function GetCandidateList() {
  

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
    
        async function getAllCandidateList(){
            try {
                
                const candidateList = await contractInstance.getCandidateList();
                console.log(candidateList);
            } catch (error) {
                
                toast.error("to fetch getAllCandidateList Error!")

            }
        }
   
        getAllCandidateList();
    },[])


  return (
    <div>GetCandidateList</div>
  )
}

export default GetCandidateList;