import {ethers } from "ethers"
import abi from "../contract/abi.json"


export const getWeb3State = async() =>{
   try {

     console.log("check ethereum object : " , window.ethereum);
    //check metamask installed or not
     if (!window.ethereum) {
        throw new Error("metamask is not installed !")
     }    

      //get account info this return all accounts
      const accounts = await window.ethereum.request({
        "method" : "eth_requestAccounts"
      });

      console.log("accounts : " , accounts)
      //extract seleted account
      const selectedAccount = accounts[0];

      console.log("selectedAccount: " , selectedAccount)

      //get chain id
       const chainHex = await  window.ethereum.request({
        "method" : "eth_chainId"
      });

      console.log("chain hex: " , chainHex)

      const chaiId = parseInt(chainHex , 16);

      console.log("chaiId: " , chaiId);



      //now provider
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer =  await provider.getSigner();

      console.log("singer : " , signer);

      //create contract instance
      const contractAddress = "0xCCC15B5CCAF92d34f3A99c2270920D3Fcf42c290";
      const contractInstance  = new ethers.Contract(contractAddress , abi , signer);
      
      console.log("contract instace: " , contractInstance);

      //return
      return { contractInstance , selectedAccount , chaiId};
     

   } catch (error) {
    console.error(error);
    // alert(error);
    throw new Error(error);
   }
}

