import {useForm} from "react-hook-form"
import { useWeb3State } from "../../hooks/useWeb3State";
import WalletRequiredState from "../../components/WalletRequiredState";
import { toast } from "sonner";


const RegisterCandidate = ()=>{

  
    
  //use web3 state to call contract
  const {  contractInstance  , selectedAccount} = useWeb3State();

  console.log("register candidate : " , contractInstance , selectedAccount);

   
     
    if(!contractInstance){
        return(
            <WalletRequiredState/>
        )
    }

   



    // Gender Enum Mapping // bec we used indexs in contract
  const genderEnum = {
    NotSpecified: 0,
    Male: 1,
    Female: 2,
    Other: 3,
  };

  

const { register, handleSubmit, formState: { errors } } = useForm();
  const handleFormSubmit = async(data) => {
   try {
    //call contract method
    const name = data.name;
    const age = parseInt(data.age);
    const gender = data.gender;
    const party = data.party;

    console.log(name , age , gender , party);

    const txs =  await contractInstance.registerCandidate( name, party , age , gender);
    console.log("reponse : " , txs);
    // alert("success !");
    toast.success("success !");
    
   } catch (error) {
    console.log("error : " , error);
    // alert("candidate registration error!") 
    toast.error("candidate registration error!"+ error)
   }

  };


 return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 border border-gray-100">
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Candidate Registration</h2>
          <p className="text-gray-500 text-sm mt-2">Please ensure your details match your legal ID.</p>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
          
          {/* Full Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
            <input 
              type="text" 
              placeholder="e.g. Jane Doe"
              {...register("name", { required: "Name is required" })} 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Age */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Age</label>
              <input 
                type="number" 
                placeholder="18"
                {...register("age", { required: "Required", min: 18 })} 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Gender</label>
              <select 
                {...register("gender")} 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              >
                <option value={genderEnum.NotSpecified}>Not Specified</option>
                <option value={genderEnum.Male}>Male</option>
                <option vvalue={genderEnum.Female}>Female</option>
                <option value={genderEnum.Other}>Other</option>
              </select>
            </div>
          </div>

          {/* Political Party */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Political Party Affinity</label>
            <input 
              type="text" 
              placeholder="e.g. Independent"
              {...register("party")} // Fixed: changed from "age" to "party"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            />
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-md hover:shadow-lg transform active:scale-[0.98] transition duration-150 mt-4"
          >
            Complete Registration
          </button>

          <p className="text-[10px] text-center text-gray-400 mt-4 uppercase tracking-widest">
            Secure Official Government Portal
          </p>
        </form>
      </div>
    </div>
  );
}
export default RegisterCandidate;