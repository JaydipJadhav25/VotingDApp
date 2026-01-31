import React, { useEffect, useState } from 'react';
import { useWeb3State } from "../hooks/useWeb3State";
import { useNavigate } from "react-router-dom"
import { axiosInstance } from '../config/axiosIntances';

function Wallet() {
  const { 
    handleWallet, 
    loading, 
    selectedAccount, 
    chainId, 
    walletIsConnected, 
    handleDissconnectWallet 
  } = useWeb3State();

  const[isAuth , setIsAuth] = useState(false);
  // Helper to shorten address for display (e.g., 0x123...456)
  const formatAddress = (addr) => {
    return addr ? `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}` : '';
  };

  
  useEffect(()=>{
    async function getInfo(){
    try {
        const res = await axiosInstance.get("/main");
        console.log("reponse : " , res.data);
         setIsAuth(true);
    } catch (error) {
      console.log("error : " , error);
    }
    }
    getInfo();
  });


  const navigate = useNavigate();

//  useEffect(()=>{
//      if (selectedAccount) {
//        navigate("/register-voter");
//      }
//  },[selectedAccount]);

  return (
    // Main Container - Centers content and sets background
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      



      {/* Card Component */}
      <div className="w-full max-w-md bg-slate-800 rounded-2xl shadow-2xl border border-slate-700 overflow-hidden">
        
        {/* Header Section */}
        <div className="p-6 text-center border-b border-slate-700">
          <h1 className="text-3xl font-extrabold text-orange-600">
            Voting Dapp
          </h1>
          <p className="text-slate-400 text-sm mt-2">Connect your wallet to vote</p>
        </div>

        {/* Content Section */}
        <div className="p-6 space-y-6">
          
          {/* Status Display */}
          <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/50">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
              Wallet Status
            </h4>
            
            {loading ? (
              <div className="flex items-center space-x-2 text-blue-400 animate-pulse">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                <p className="text-sm font-medium">Processing...</p>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-sm">Account:</span>
                  <span className="font-mono text-white bg-slate-700 px-2 py-1 rounded text-sm">
                    {selectedAccount ? formatAddress(selectedAccount) : 'Not Connected'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-sm">Chain ID:</span>
                  <span className="text-blue-400 text-sm font-semibold">
                    {chainId || '-'}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div>
            {!walletIsConnected ? (
              <button
                onClick={handleWallet}
                disabled={loading}
                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-bold rounded-xl transition duration-200 shadow-lg shadow-blue-900/20 flex justify-center items-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Connecting...</span>
                  </>
                ) : (
                  "Connect Wallet"
                )}
              </button>
            ) : (
              <button
                onClick={handleDissconnectWallet}
                disabled={loading}
                className="w-full py-3 px-4 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/50 font-bold rounded-xl transition duration-200"
              >
                {loading ? "Processing..." : "Disconnect Wallet"}
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default Wallet;