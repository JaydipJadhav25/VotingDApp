import { useWeb3State } from "../../hooks/useWeb3State";
import {toast} from "sonner"

export default function EmergencyDeclare() {

   const {contractInstance} = useWeb3State();



   const emergencyStop = async () => {
      if (!contractInstance) {
         return;
      }
      try{
         await contractInstance.emergencyStopVoting();
         toast.success("Emergency Stop successfully!");
      }catch(error){
         toast.error("Error: Emergency Stop")
         console.error(error);
      }
      
   }

   return (
      <div className="p-2 flex justify-center">
          <button 
          onClick={emergencyStop}
            type="submit"
            className="w-full md:w-auto px-6 py-2.5 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 focus:ring-4 focus:ring-gray-200 transition-transform active:scale-95 flex items-center justify-center space-x-2"
          >
            <span>Stop Emergency </span>
          </button>
        </div>
   )
}