// import { createContext, useContext, useEffect, useState } from "react";

// export const WalletConnection = createContext(undefined);

// function WalletConnectionProvide({ children }) {
//   //stat
//   const { walletConnect, setWalletConnection } = useState({
//     isWalletConnected: false,
//     walletAddress: null,
//     chaiId: null,
//   });

//   useEffect(() => {
//     async function createWalletConnection() {
//       try {
//         if (!window.ethereum) {
//           throw new Error("wallet is not installed !");
//         }

//         const accounts = await window.ethereum.request({
//           method: "eth_requestAccounts",
//         }); //this retunr array of accounts

//         const selectedAccount = accounts[0];

//         const chaiIdInHex = await window.ethereum.request({
//           method: "eth_chainId",
//         }); //return in hex decimal so need to convert in to number

//         const chainId = parseInt(chaiIdInHex, 16); //this is network id

//         //setInStae
//         setWalletConnection({
//           isWalletConnected: true,
//           walletAddress: accounts,
//           chaiId: chainId,
//         });
//       } catch (error) {
//         setWalletConnection({
//           isWalletConnected: false,
//           walletAddress: null,
//           chaiId: null,
//         });
//       }
//     }

//     createWalletConnection();
//   }, []);

//   return <WalletConnection.Provider value={{...walletConnect}}>{children}</WalletConnection.Provider>;
// }

// export default WalletConnectionProvide;




// /// 
// export const  useWallet = () => {

//     const context = useContext(WalletConnection);
//     if (!context) {
//         throw new Error("web3 state context hook error !");
//     }
   
//     return context;
    
// }


