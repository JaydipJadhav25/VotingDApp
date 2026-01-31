import { toast } from "sonner";
import WalletRequiredState from "../../components/WalletRequiredState";
import { useWeb3State } from "../../hooks/useWeb3State";
import {useForm} from "react-hook-form"

function CastVote() {

  const {  contractInstance } = useWeb3State();
  if (!contractInstance) {
     return <WalletRequiredState/>
  }
  
  const {register , handleSubmit} = useForm();

  async function castVote(data){
   if(!contractInstance) return;
   const voterId = Number(data?.voterId);
   const candidateId = Number(data?.candidateId);


//    try {
//     const res = await contractInstance.castVote(voterId , candidateId);
//     console.log("cast vote response : " , res);
//     toast.success("castVote successfully !");
//    } catch (error) {
//     console.log("erro : " , error)
//     toast.error("castVote Error!")
//    }


try {
  const tx = await contractInstance.castVote(voterId, candidateId);
  await tx.wait(); // wait for confirmatio
 
  toast.success("castVote successfully !");

} catch (err) {
  console.error("Voting failed:", err);

  let message = "Transaction failed!";

  // Ethers v6 revert handling
  if (err.shortMessage) {
    message = err.shortMessage;
  } 
  else if (err.reason) {
    message = err.reason;
  } 
  else if (err.message) {
    message = err.message;
  }

//   alert("❌ " + message);
  toast.error(" " + message)
}


  }

  return (
     <div className="bg-white mt-2 rounded-xl shadow-lg border border-gray-100 p-8 max-w-md mx-auto relative overflow-hidden">
      
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-amber-400 rounded-full opacity-10 blur-2xl pointer-events-none"></div>

      {/* Header Section */}
      <div className="text-center mb-8 relative z-10">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-100 text-amber-600 rounded-full mb-4">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Cast Your Vote</h1>
        <p className="text-sm text-gray-500 mt-2 px-6">
          Enter your unique Voter ID and the ID of your chosen candidate to submit your ballot.
        </p>
      </div>

      {/* Form Section */}
      <form onSubmit={handleSubmit(castVote)} className="space-y-6 relative z-10">
        
        {/* Voter ID Field */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700 ml-1">
            Voter ID
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400 group-focus-within:text-amber-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0c0 .6.4 1 1 1 1 1 1-1 1-1h3" />
              </svg>
            </div>
            <input 
              {...register("voterId", { required: true })} 
              type="number" 
              placeholder="e.g. 101"
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all bg-gray-50 hover:bg-white text-gray-900 placeholder-gray-400"
            />
          </div>
        </div>

        {/* Candidate ID Field */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700 ml-1">
            Candidate ID
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400 group-focus-within:text-amber-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <input 
              {...register("candidateId", { required: true })} 
              type="number"
              placeholder="e.g. 5" 
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all bg-gray-50 hover:bg-white text-gray-900 placeholder-gray-400"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button 
          type="submit"
          className="w-full py-3.5 px-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:from-black hover:to-gray-900 transform transition-all active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 flex items-center justify-center space-x-2 mt-2"
        >
          <span>Confirm Vote</span>
          <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </button>

      </form>
    </div>
  )
}

export default CastVote