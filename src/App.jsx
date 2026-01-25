import { useContext, useEffect } from 'react'
import './App.css'
import { web3Context } from './context/Web3Context'

function App() {


  const  { handleWallet   , loading , selectedAccount , chainId, walletIsConnected  , handleDissconnectWallet} = useContext(web3Context);

 

  return (
    <>
      <h1>voting  Dapp</h1>
       
       <h4>info</h4>
       {
        loading ? <>
          <p>loading..........</p>
        </>: <>
         <p>{selectedAccount && selectedAccount}</p>
         <p>{chainId && chainId}</p>
        </> 
       }


      <button
      onClick={()=>{
        handleWallet();
       
      }}
      hidden={walletIsConnected}
      >
        {
          loading ? "loading..." : "connect wallet"
        }
      </button>


       <button
      onClick={()=>{
  
        handleDissconnectWallet();
       
      }}
      hidden={!walletIsConnected}
      >
        {
          loading ? "loading..." : "Disconnect wallet"
        }
      </button>


      

    </>
  )
}

export default App
