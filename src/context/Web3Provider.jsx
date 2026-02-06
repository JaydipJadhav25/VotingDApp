import { useEffect, useState } from "react";
import { web3Context } from "./Web3Context";
import { getWeb3State } from "../util/GetWeb3State";
import { handleAccountChange } from "../util/HandleAccountChnage";
import { handleChainChange } from "../util/HandleChainChnage";

function Web3Provider({ children }) {
  const [loading, setLoading] = useState(false);
  const [walletIsConnected, setWalletConnected] = useState(false);
  const [web3State, setWeb3State] = useState({
    contractInstance: null,
    selectedAccount: null,
    chainId: null,
    provider : null,
    signer : null
  });

  // handl web3state
  const handleWallet = async () => {
    setLoading(true);
    try {
      //get val and set in state
      const { contractInstance, selectedAccount, chainId  , provider , signer} =
        await getWeb3State();
      setWeb3State({ contractInstance, selectedAccount, chainId , provider , signer });
      setWalletConnected(true);
    } catch (error) {
      console.error("error in web3state : ", error);
      alert("error in web3state and provider !" + error);
      setWalletConnected(false);
    } finally {
      setLoading(false);
    }
  };

  const handleDissconnectWallet = () => {
    //set state null
    setWeb3State({
      selectedAccount: null,
      contractInstance: null,
      chainId: null,
    });
    setWalletConnected(false);
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", () =>
        handleAccountChange(setWeb3State),
      );

      if (window.ethereum) {
        window.ethereum.on("chainChanged", () =>
          handleChainChange(setWeb3State),
        );
      }
    }



    return ()=>{
      window.ethereum.removeListener("accountsChanged" , () => handleAccountChange(setWeb3State))
      window.ethereum.removeListener("chainChanged" , () => handleAccountChange(setWeb3State))
    }
  }, []);

  console.log(
    "wallet data : ",
    web3State.contractInstance,
    web3State.selectedAccount,
    web3State.chainId,

  );

  return (
    <web3Context.Provider
      value={{
        ...web3State,
        loading,
        handleWallet,
        walletIsConnected,
        handleDissconnectWallet,
      }}
    >
      {children}
    </web3Context.Provider>
  );
}





export default Web3Provider;
