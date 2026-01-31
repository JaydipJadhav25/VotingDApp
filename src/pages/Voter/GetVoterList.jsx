import { useEffect, useState } from "react";
import WalletRequiredState from "../../components/WalletRequiredState";
import { useWeb3State } from "../../hooks/useWeb3State"
import { toast } from "sonner";

function GetVoterList() {
  

    //get contract instance
     const {  contractInstance } = useWeb3State();
     const [voterList , setVoterList] = useState([]);



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
                
                const response = await contractInstance.getVoterList();
                console.log("response : " , response);
                setVoterList(response);
                toast.success("fetched Successfully!")
            } catch (error) {
                console.log("eror : " , error);
                toast.error("to fetch voterslist Error!")
            }
        }
        getAllVotersList();
    },[contractInstance]);


      const genderEnum = {
   0 :  " NotSpecified ",
    1 :  "Male ",
    2 :  "Female",
    3 :  " Other",
  };


    console.log("voter lists: " , voterList[0]);


  return (
   <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Voter Registry
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage and view registered voters on the blockchain.
            </p>
          </div>
          <div className="bg-amber-100 text-amber-800 px-4 py-2 rounded-lg text-sm font-semibold shadow-sm border border-amber-200">
            Total Registered: {voterList?.length || 0}
          </div>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Map through list */}
        {voterList?.map((ele, index) => (
          <div 
            key={index} 
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col"
          >
            {/* Card Top: Name & ID */}
            <div className="bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-4 flex justify-between items-center">
              <div className="flex items-center space-x-3">
                {/* Initial Avatar */}
                <div className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white font-bold border border-white/30">
                  {ele.name.charAt(0).toUpperCase()}
                </div>
                <h3 className="text-white font-bold text-lg truncate capitalize max-w-[150px]">
                  {ele.name}
                </h3>
              </div>
              <span className="text-xs font-mono text-amber-100 bg-black/20 px-2 py-1 rounded">
                #{ele?.voterId.toString()}
              </span>
            </div>

            {/* Card Body: Details */}
            <div className="p-6 space-y-4">
              
              {/* Detail Row: Gender & Age */}
              <div className="grid grid-cols-2 gap-4 border-b border-gray-100 pb-4">
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold">Gender</p>
                  <p className="text-sm font-medium text-gray-700 capitalize mt-1">{genderEnum[ele.gender] || ele.gender}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold">Age</p>
                  <p className="text-sm font-medium text-gray-700 mt-1">{ele.age.toString()} Yrs</p>
                </div>
              </div>

              {/* Detail Row: Address */}
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold">Wallet Address</p>
                <div className="mt-2 flex items-center justify-between bg-gray-50 p-2 rounded border border-gray-100 group cursor-pointer hover:border-amber-300 transition-colors">
                  <code className="text-xs text-amber-600 font-mono break-all">
                    {ele?.voterAddress.toString()}
                  </code>
                </div>
              </div>
              
            </div>
          </div>
        ))}
      </div>

      {/* Empty State Handling */}
      {(!voterList || voterList.length === 0) && (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="h-24 w-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900">No voters found</h3>
          <p className="text-gray-500">Get started by registering a new voter.</p>
        </div>
      )}
    </div>
  )
}

export default GetVoterList;