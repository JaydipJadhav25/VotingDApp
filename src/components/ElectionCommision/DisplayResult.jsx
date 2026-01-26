import React, { useEffect } from 'react'

function DisplayResult() {
   

        const[votingResult, setVotingResult] = useState(undefined);


     const {  contractInstance } = useWeb3State();

    
     //fetch voting result fetch
     useEffect(()=>{
        
     })

     async function getVotingResult(){
        try {
            
            const votingstatus = await contractInstance.getVotingStatus();
            setVotingStatus(votingstatus);
            toast.success("fetched voting status successfully !");

        } catch (error) {
            toast.error("fetch status error !");
        }
     }
  

  return (
     <div>
        <h1>AnnounceVotingResult</h1>
        <button>Result</button>
     </div>
  )
}

export default DisplayResult