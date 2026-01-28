import React, { useEffect, useState, useMemo } from 'react';
import { useWeb3State } from '../../hooks/useWeb3State';
import { toast } from 'sonner';

function VotingStatus() {
    const [votingStatus, setVotingStatus] = useState("Loading...");
    const [isLoading, setIsLoading] = useState(true);
    const { contractInstance } = useWeb3State();


    // Memoize the map so it's not recreated on every render
    const statusMap = useMemo(() => ({
        0: "Not Started",
        1: "In Progress",
        2: "Ended"
    }), []);

    
    useEffect(() => {
        const getVotingStatus = async () => {
            // Only attempt to fetch if the contractInstance exists
            if (!contractInstance) return;

            try {
                setIsLoading(true);
                const status = await contractInstance.getVotingStatus();
                 
                console.log("response  voting status : " , status);
                // Convert to Number in case the contract returns a BigInt
                const statusKey = Number(status);
                setVotingStatus(statusMap[statusKey] || "Unknown Status");
                toast.success("Fetched voting status!");
            } catch (error) {
                console.error("Fetch error:", error);
                toast.error("Failed to fetch status.");
                setVotingStatus("Error fetching status");
            } finally {
                setIsLoading(false);
            }
        };

        getVotingStatus();
    }, [contractInstance]); // Re-run when contractInstance is ready

    if (!contractInstance) {
        return <p className="text-amber-500">Connecting to wallet...</p>;
    }



  




    return (
       <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        {/* Left Side: Title & Icon */}
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-amber-100 rounded-lg text-amber-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">Election Dashboard</h2>
            <p className="text-sm text-gray-500">Real-time voting updates</p>
          </div>
        </div>

        {/* Right Side: Status Badge */}
        <div className="flex items-center">
          {isLoading ? (
            // Loading State
            <div className="flex items-center space-x-2 px-4 py-2 bg-gray-50 rounded-full border border-gray-100">
              <svg className="animate-spin h-4 w-4 text-amber-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="text-sm font-medium text-gray-500">Syncing...</span>
            </div>
          ) : (
            // Status Display
            <div className="flex items-center space-x-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-100">
              {/* Pulsing Dot for "Live" feel */}
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <span className="text-sm font-bold uppercase tracking-wide">
                {votingStatus || "Status Unknown"}
              </span>
            </div>
          )}
        </div>
        
      </div>
    </div>
    );
}

export default VotingStatus;