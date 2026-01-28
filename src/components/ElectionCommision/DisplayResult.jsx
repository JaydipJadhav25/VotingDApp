import  { useState,useEffect } from 'react'

import {toast} from "sonner"
import { useWeb3State } from '../../hooks/useWeb3State';

const DisplayResult = () => {
        

    const {contractInstance} = useWeb3State();
    const [winner, setWinner] = useState("No winner declared");
   
    useEffect(()=>{
        const getWinner = async()=>{
          try{
            const winningCandidateAddress = await contractInstance.winner();
            if(winningCandidateAddress!='0x0000000000000000000000000000000000000000'){
              setWinner(winningCandidate);
            }
          }catch(error){
            toast.error("Error: Getting Winner");
            console.error(error)
          }
        }
        contractInstance && getWinner()
      },[]);


  return (
    <div className="p-6">
      {winner ? (
        // STATE: Winner Declared
        <div className="relative overflow-hidden bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl shadow-lg text-white p-8 max-w-2xl mx-auto">
          {/* Decorative Background Pattern */}
          <div className="absolute top-0 right-0 -mt-4 -mr-4 opacity-20">
            <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>

          <div className="relative z-10 flex items-center space-x-6">
            {/* Trophy Icon Container */}
            <div className="bg-white/20 p-4 rounded-full backdrop-blur-sm border border-white/30">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>

            <div>
              <p className="text-amber-100 font-medium tracking-wide uppercase text-sm">
                Election Result
              </p>
              <h3 className="text-3xl font-extrabold tracking-tight mt-1 capitalize">
                {winner}
              </h3>
              <p className="text-xs text-amber-100 mt-1 opacity-80">
                Winning Candidate
              </p>
            </div>
          </div>
        </div>
      ) : (
        // STATE: No Winner Yet
        <div className="bg-white border border-gray-200 rounded-xl p-6 flex items-center justify-center space-x-3 text-gray-400 max-w-2xl mx-auto">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="font-medium">Election in progress... No winner declared.</span>
        </div>
      )}
    </div>
  )
}

export default DisplayResult