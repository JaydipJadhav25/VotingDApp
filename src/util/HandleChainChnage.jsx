

export const handleChainChange = async(setWeb3State) =>{

     const chaiIdInHex = await window.ethereum.request({
         "method" : "eth_chainId"
       }) //return in hex decimal so need to convert in to number

        const chainId = parseInt(chaiIdInHex , 16);//this is network id
    
    setWeb3State((prev) => ({...prev , chainId}));


};