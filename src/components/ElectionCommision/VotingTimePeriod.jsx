import { useRef } from "react";
import {toast} from "sonner"
import { useWeb3State } from "../../hooks/useWeb3State";

const VotingTimePeriod = ()=>{
  
  const {contractInstance} = useWeb3State();
  
  const startRef = useRef(null);
  const endRef = useRef(null);
  const handleVotingTime=async(e)=>{
     if (!contractInstance) return ;
      try{
        e.preventDefault();
        const startTime = startRef.current.value;
        const endTime = endRef.current.value;
       
        // console.log(startTime,endTime)
              // Convert to milliseconds
      const startMs = new Date(startTime).getTime();
      const endMs   = new Date(endTime).getTime();

      // Convert to seconds
      const startSec = Math.floor(startMs / 1000);
      const endSec   = Math.floor(endMs / 1000);

      // Get current blockchain time (approx = now)
      const nowSec = Math.floor(Date.now() / 1000);

      // Calculate difference
      const startOffset = startSec - nowSec; // seconds from now
      const duration = endSec - startSec;    // total seconds

      console.log("staring date : " ,  startOffset, " ending : " ,  duration);


      //  const res =  await contractInstance.setVotingPeriod(startTime,endTime)
      //  const res =  await contractInstance.setVotingPeriod(startOffset , duration)
       
       const res =  await contractInstance.setVotingPeriod( 0 , 3700) //harcode time for tempory testing
        console.log("Voter Time is set successful" , res);
        toast.success("Voter Time is set successful")
      }catch(error){
        toast.error("Error: Voting Time Period");
        console.error(error)
      }
  }
  return(
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 max-w-2xl mx-auto">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-900">Set Election Period</h3>
        <p className="text-sm text-gray-500">Define the start and end dates for the voting session.</p>
      </div>

      <form onSubmit={handleVotingTime} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Start Date Field */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Start Date
            </label>
            <div className="relative">
              <input 
                type="datetime-local" 
                ref={startRef}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all text-gray-700 bg-gray-50 hover:bg-white"
                required
              />
            </div>
          </div>

          {/* End Date Field */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              End Date
            </label>
            <div className="relative">
              <input 
                type="datetime-local" 
                ref={endRef}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all text-gray-700 bg-gray-50 hover:bg-white"
                required
              />


            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <button 
            type="submit"
            className="w-full md:w-auto px-6 py-2.5 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 focus:ring-4 focus:ring-gray-200 transition-transform active:scale-95 flex items-center justify-center space-x-2"
          >
            <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>Initialize Election</span>
          </button>
        </div>
      </form>
    </div>
  )
}
export default VotingTimePeriod;