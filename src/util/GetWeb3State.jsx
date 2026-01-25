import {ethers } from "ethers"
import abi from "../contract/abi.json"


export const getWeb3State = async() =>{
   try {

      //to create connection with wallet
      //if wallet is installed or not check
      //1.check first wallet 
      console.log("wallet  : " , !window.ethereum);
      console.log("wallet  : " , window.ethereum);
      if (!window.ethereum){
         throw new Error("wallet is not installed !");
      }  
      
      //2 . get current account // to extract user info on client side with the help of wallet
       const accounts = await window.ethereum.request({
           "method" :"eth_requestAccounts"
       });//this retunr array of accounts

        console.log("accounts : " , accounts);


       //3. get only selected account
       const selectedAccount = accounts[0];

       console.log("selected account : "  , selectedAccount);
       
       //4.chai id mesn=> curreect blockchain chain id - network id ,
       //ethereum = 1 , sepolia = 11155111.etc
       //to request to account , meta mask for id
       const chaiIdInHex = await window.ethereum.request({
         "method" : "eth_chainId"
       }) //return in hex decimal so need to convert in to number

        const chainId = parseInt(chaiIdInHex , 16);//this is network id
          
        console.log("chainId :" , chainId);

       //5 now create instace of contract  instance,
       //on server side => contract address , abi , provider(publicnode)/signer(wallet)
       //but on client side this all part handl wallet , 

       const provider =  new ethers.BrowserProvider(window.ethereum)//no need to passs url , our broser and wallet hald this internally

      //6 now this provider help to get our signer
      const signer = await provider.getSigner();
      const contractAddress = "0xCCC15B5CCAF92d34f3A99c2270920D3Fcf42c290"
      // const contractInstance =  new ethers.Contract(contractAddress , abi , provider); this instace only perform read opratiosn not write
      const contractInstance =   new ethers.Contract(contractAddress , abi ,signer);


      return {contractInstance , selectedAccount , chainId}

   
   } catch (error) {
   //  console.error(error);
   console.log("error : " , error);
    // alert(error);
    throw new Error(error);
   }
}

