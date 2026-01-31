import {toast} from "sonner"
import { useWeb3State } from "../../hooks/useWeb3State";
export default function AnnounceWinner() {
 
   const {contractInstance} = useWeb3State();

   const getWinner = async () => {
      if(!contractInstance) return;
      try{
         const tx = await contractInstance.announceVotingResult();
           console.log("reponse from get winner : " , tx);
           toast.success("Announcing result successfully")
      }catch(error){
         toast.error("Error: Announcing result")
         console.error(error)
      }
        
    }
 
   return (
       <div className="p-2 flex justify-center">
          <button 
          onClick={getWinner}
            type="submit"
            className="w-full md:w-auto px-6 py-2.5 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 focus:ring-4 focus:ring-gray-200 transition-transform active:scale-95 flex items-center justify-center space-x-2"
          >
            <span>Announce Winner </span>
          </button>
        </div>
   )
}