import { useContext, useEffect } from 'react'
import './App.css'
import { web3Context } from './context/Web3Context'

function App() {


  const  { handleWallet } = useContext(web3Context);

 

  return (
    <>
      <h1>voting d app</h1>
      <button
      onClick={()=>{
        handleWallet();
      }}
      >connect wallet</button>
    </>
  )
}

export default App
