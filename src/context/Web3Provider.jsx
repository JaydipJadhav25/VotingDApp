import  { useState } from 'react'
import {web3Context} from "./Web3Context"
import { getWeb3State } from '../util/GetWeb3State';


function Web3Provider({children}) {
    const[loading , setLoading] = useState(false);
const [web3State , setWeb3State] = useState({
    contractInstance : null,
    selectedAccount : null,
    chaiId : null
});


// handl web3state
const handleWallet = async() =>{
  try {
    //get val and set in state
    const  {contractInstance , selectedAccount , chaiId} = await getWeb3State();
 
    console.log("contractInstance , selectedAccount , chaiId : " , contractInstance , selectedAccount , chaiId);

    setWeb3State({contractInstance , selectedAccount , chaiId});

  } catch (error) {
    console.error("error in web3state : " , error);
    alert("error in web3state and provider !");
  }
}

console.log("wallet data : " , web3State.contractInstance , web3State.chaiId , web3State.chaiId);


  return (
    <web3Context.Provider value={{...web3State , loading , handleWallet}}>
         {children }
    </web3Context.Provider>
  )
}

export default Web3Provider