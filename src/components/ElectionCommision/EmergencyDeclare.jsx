import { useWeb3State } from "../../hooks/useWeb3State";
import {toast} from "sonner"

export default function EmergencyDeclare() {

   const {contractInstance} = useWeb3State();

   const emergencyStop = async () => {
      try{
         await contractInstance.emergencyStopVoting()
      }catch(error){
         toast.error("Error: Emergency Stop")
         console.error(error)
      }
      
   }

   return <button onClick={emergencyStop}>Stop voting</button>
}