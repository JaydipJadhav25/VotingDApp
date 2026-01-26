import { useContext } from "react";
import { web3Context } from "../context/Web3Context";



export const useWeb3State = () =>{
    const context = useContext(web3Context);
    if (!context) {
        throw new Error("web3 state context hook error !");
    }

    return context;
}