import {toast} from "sonner"
import { useWeb3State } from "../../hooks/useWeb3State";
export default function AnnounceWinner() {
 
   const {contractInstance} = useWeb3State();

   const getWinner = async () => {
      if(!contractInstance) return;
      try{
         const tx = await contractInstance.announceVotingResult()
      }catch(error){
         toast.error("Error: Announcing result")
         console.error(error)
      }
        
    }
 
   return <div>
      <button onClick={getWinner}> Announce Winner </button>
   </div>
}