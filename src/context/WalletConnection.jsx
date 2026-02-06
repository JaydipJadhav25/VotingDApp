// import { createContext, useState } from "react";



// const  walletConnection = createContext(undefined);

// //stat
// const { walletConnect , setWalletConnection } = useState({
//     isWalletConnected : false,
//     walletAddress : null,
//     chaiId : null
// });

// function WalletConnection({children}){
//     try {
//         //check etheruem
      
//     if (!window.ethereum) {
//       throw new Error("wallet is not installed !");
//     }

//     //get account addres : 
//     const accounts = await window.ethereum.request({
//       method: "eth_requestAccounts",
//     }); 

//     } catch (error) {

        
//     }
// }

// export default WalletConnection;