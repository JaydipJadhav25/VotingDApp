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
                 
                console.log("response : " , status);

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
        <div className="p-4 border rounded-lg shadow-sm">
            <h2 className="text-xl font-bold mb-2">Voting Dashboard</h2>
            <div className="flex items-center gap-2">
                <span className="font-medium">Current Status:</span>
                {isLoading ? (
                    <span className="animate-pulse text-gray-400">Fetching...</span>
                ) : (
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                        {votingStatus}
                    </span>
                )}
            </div>
        </div>
    );
}

export default VotingStatus;