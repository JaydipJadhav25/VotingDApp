import { ethers } from "ethers";
import { useCallback } from "react"
import { contractInstace } from "../smartContract/contract.config";



export const useContract  = () =>{

    //get vcontract function
    const getContract = useCallback(async(needsigner = false) =>{
          //checl  meta mask is install
            if (!window.ethereum) {
            throw new Error('Please install MetaMask or another Web3 wallet');
        }
      
     const provider  =   new ethers.BrowserProvider(window.ethereum);

     if (needsigner) {
        const signer = await provider.getSigner();
        return new  ethers.Contract(
           contractInstace.address,
           contractInstace.abi,
           signer
        )
     }

     //only providr
       return new  ethers.Contract(
           contractInstace.address,
           contractInstace.abi,
          provider
        )
        

    },[]);





    return {

    }
}