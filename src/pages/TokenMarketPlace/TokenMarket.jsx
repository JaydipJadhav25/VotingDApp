import { useEffect, useState } from "react";
import WalletRequiredState from "../../components/WalletRequiredState";
import { useWeb3State } from "../../hooks/useWeb3State";
import { ethers } from "ethers";
import { contractInstaceTokenMarket } from "../../smartContract/marketContract.config";
import { toast } from "sonner";
import { contractInstaceToken } from "../../smartContract/tokneContract.config";
// import { useWallet } from "../../context/WalletConnection";

import sendMoenyAbi from "../../contract/snedMoeny.json"



function TokenMarket() {
  const { provider, signer, selectedAccount } = useWeb3State();
  const [loading , setLoading ] = useState(false);
  
  const [ tokenInfo, setTokenInfo ] = useState({
    balance: 0,
    token: null,
    tokenPrice : 0 ,
    accountBalance : 0,
    tokenMarketTokens  : 0,
  });

  const [sendMoenyInstace , setSendMoneyInstace] = useState(undefined);
  const[sendEthTo , setSendEthTo] = useState({
    to : undefined,
    eth : undefined
  })


  const [ tokenMarketInstance, setTokenMarketInstance ] = useState(undefined);
  const [ tokenInstance, setTokenInstance ] = useState(undefined);


  const [ token , setToken] = useState(0);
  // const [ tokenBuy , setTokenBuy] = useState(undefined);

  if (!provider || !signer) {
    return <WalletRequiredState />;
  }

  //create token instace
  //1 => tokeninstace
  useEffect(() => {
    async function getContractInstaceOFToken() {
      try {
        setLoading(true);
        //create contract insatce and get info
        const constractInstace = new ethers.Contract(
          contractInstaceToken.address,
          contractInstaceToken.abi,
          signer,
        );
        //get info fron intnce
        // console.log("contracrinstce : " , constractInstace);
        setTokenInstance(constractInstace);//set token instance
        const userBalace = await constractInstace.balanceOf(selectedAccount);

        console.log("userbalance : " , userBalace);
        setTokenInfo({
          balance: ethers.formatEther(userBalace , 18) ,
          token: "JAY",
        });
        // toast.success("suucess!");
      } catch (error) {
        console.log("error : ", error);
        toast.error("fialed!");
      }finally{
        setLoading(false);
      }
    }

    getContractInstaceOFToken();
  }, [provider  , signer]);






  //2 . create token market instance
    useEffect(() => {
    async function getContractInstaceOFTokenMarket() {
      try {
        setLoading(true);
        //create contract insatce and get info
        const constractInstace = new ethers.Contract(
          contractInstaceTokenMarket.address,
          contractInstaceTokenMarket.abi,
          signer,
        );
        const tokenPrice = await constractInstace.tokenPrice();
        const contractBalance = await provider.getBalance(contractInstaceTokenMarket.address);

        console.log("contract balance : " , );

       setTokenInfo((prev) => ({
            ...prev,
            // Convert BigInt to human-readable string (e.g., "1.5")
            tokenPrice: ethers.formatUnits(tokenPrice, 18), 
            accountBalance: ethers.formatEther(contractBalance) 
          }));
        setTokenMarketInstance(constractInstace);
        //set token price


        // toast.success("suucess!");
      } catch (error) {

        console.log("error : ", error);
        toast.error("fialed!");
      }finally{
        setLoading(false);
      }
    }

    getContractInstaceOFTokenMarket();
  }, [signer]);


  //to get token market tokens
   useEffect(() => {
    async function fetch() {
      try {
        if (!tokenInstance) {
          return;
        }
        setLoading(true);

        const holdToken = await tokenInstance?.balanceOf(contractInstaceTokenMarket.address); ;
       setTokenInfo((prev) => ({
            ...prev,
            tokenMarketTokens : ethers.formatEther(holdToken)
          }));
      

        // toast.success("suucess!");
      } catch (error) {

        console.log("error : ", error);
        toast.error("fialed!");
      }finally{
        setLoading(false);
      }
    }

    fetch();
  }, [tokenInstance]);



 
  //3.create send moeny
      useEffect(() => {
    async function init() {
      try {
        setLoading(true);
        //create contract insatce and get info
        const address = "0xF7a65A3bA03FaAc178b6E3f31E63B9DbF0403b7B";
        const constractInstace = new ethers.Contract(
          address,
         sendMoenyAbi,
          signer,
        );
    
       setSendMoneyInstace(constractInstace);
       console.log("send moeny done.")
        //set token price
        // toast.success("suucess!");
      } catch (error) {
        console.log("error : ", error);
        toast.error("fialed!");
      }finally{
        setLoading(false);
      }
    }

        init();
  }, [signer]);
  


  //buy token
async function buyToken() {
  try {
    setLoading(true);
    console.log("call...............")

    // Check contract
    if (!tokenMarketInstance) {
      toast.error("Contract not connected");
      return;
    }

    // Check token
    if (toast <= 0) {
      toast.error("Invalid token amount");
      return;
    }

    // Send transaction
    //first calculateTokenPrice 
    // const price = await tokenMarketInstance.calculateTokenPrice(token);

    // console.log("price : " , Number(price));

    // const tx = await tokenMarketInstance.buyGLDToken(token ,{
    //   value : Number(price) //This becomes msg.value
    // });
     
    console.log("token : " , token);
     const tx = await tokenMarketInstance.buyGLDToken(token, {
      value: 100000000000000, //  Correct
    });
     console.log("txxx...........  : " , tx);
    toast.info("Transaction sent. Waiting for confirmation... ⏳");

    // Wait for confirmation
    const receipt = await tx.wait(1); // 1 confirmation

    console.log("Transaction confirmed:", receipt);

    toast.success("Token purchased successfully ✅");

  } catch (error) {
    console.error("Buy Token Error:", error);

    // Handle user rejection
    if (error.code === 4001) {
      toast.error("Transaction rejected ❌");
    } else {
      toast.error("Buy token failed!");
    }

  } finally {
    setLoading(false);
  }
}


//sell token
async function sellToken() {
  try {
    setLoading(true);

    // Check contract
    if (!tokenMarketInstance) {
      toast.error("Contract not connected");
      return;
    }

    // Check token
    if (!token) {
      toast.error("Invalid token amount");
      return;
    }

    // Send transaction
    // const tokenInEth =  ethers.parseEther(token , 18);
     const tokenValueWei = ethers.parseEther(token,18);

    const tx = await tokenMarketInstance.sellGLDToken(tokenValueWei);

    toast.info("Transaction sent. Waiting for confirmation... ⏳");

    // Wait for confirmation
    const receipt = await tx.wait(1); // 1 confirmation

    console.log("Transaction confirmed:", receipt);

    toast.success("Token purchased successfully ✅");

  } catch (error) {
    console.error("sell Token Error:", error);

    // Handle user rejection
    if (error.code === 4001) {
      toast.error("Transaction rejected ❌");
    } else {
      toast.error("sell token failed!");
    }

  } finally {
    setLoading(false);
  }
}


//approve function
//flow = > to send contract address and token 
//then then sccuess fullt contract send to token to user
//requried tokenmarket contract addres


async function approve() {
  try {
    setLoading(true);

    // Check contract
    if (!tokenMarketInstance) {
      toast.error("Contract not connected");
      return;
    }

    //for toke instace
      if (!tokenInstance) {
      toast.error("Contract not connected");
      return;
    }

    // Check token
    if (!token) {
      toast.error("Invalid token amount");
      return;
    }

     const tokenValueWei = ethers.parseEther(token,18);
     console.log("token val : " , tokenValueWei , tokenInstance);
    // Send transaction
    const tokenMarketadd = "0x9157dB1da142B1AFdCACf855332261083F1C9cdc"
    const tx = await  tokenInstance.approve(tokenMarketadd, tokenValueWei);
    toast.info("Transaction sent. Waiting for confirmation... ⏳");

    // Wait for confirmation
    const receipt = await tx.wait(1); // 1 confirmation

    console.log("Transaction confirmed:", receipt);

    toast.success("Token approve successfully ✅");

  } catch (error) {
    console.error("token approve  Error:", error);

    // Handle user rejection
    if (error.code === 4001) {
      toast.error("Transaction rejected ❌");
    } else {
      toast.error("approv token failed!");
    }

  } finally {
    setLoading(false);
  }
}



async function trnsfer() {
  try {
    setLoading(true);

    // Check contract
    if (!sendMoenyInstace) {
      toast.error(" sendMoenyInstace :Contract not connected");
      return;
    }

    if (!sendEthTo.eth || !sendEthTo.to) {
      toast.error(" eth and to address requried");
      return;
    }

    console.log("send th info : " , sendEthTo.eth  , sendEthTo.to)


    // Send transaction
    const tx = await sendMoenyInstace.trnsfer(sendEthTo.to , {
      value : sendEthTo.eth
    });

    toast.info("Transaction sent. Waiting for confirmation... ⏳");

    // Wait for confirmation
    const receipt = await tx.wait(1); // 1 confirmation

    console.log("Transaction confirmed:", receipt);

    toast.success("send eth successfully ✅");

  } catch (error) {
    console.error("send eth Error:", error);

    // Handle user rejection
    if (error.code === 4001) {
      toast.error("Transaction rejected ❌");
    } else {
      toast.error("send eth failed!");
    }

  } finally {
    setLoading(false);
  }
}


console.log("send th info : " , sendEthTo.eth  , sendEthTo.to)






  return (
     <div className="min-h-screen bg-amber-50 flex flex-col items-center py-10 px-4">
       
         {loading && (
        <div className="flex items-center justify-center space-x-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
          <h1 className="text-xl font-semibold text-gray-700">Loading...</h1>
        </div>
      )}

      {/* --- Header Card --- */}
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl overflow-hidden mb-6">
        <div className="bg-orange-500 p-4 text-center">

          <h1 className="text-3xl font-extrabold text-white font-stretch-semi-condensed uppercase tracking-wider">
            Token Market
          </h1>
        </div>

       <div className="bg-white p-6 rounded-b-2xl">
  
  {/* Section 1: Market Contract Status (Liquidity) */}
  <div className="space-y-3 mb-6">
    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Market Liquidity</h3>
    
    <div className="flex justify-between items-center">
      <span className="text-gray-600 font-medium">Contract ETH Balance</span>
      <span className="font-mono font-bold text-gray-800 bg-gray-100 px-2 py-1 rounded text-sm">
        {tokenInfo.accountBalance} ETH
      </span>
    </div>

    <div className="flex justify-between items-center">
      <span className="text-gray-600 font-medium">Tokens Available for Sale</span>
      <span className="font-mono font-bold text-gray-800 bg-gray-100 px-2 py-1 rounded text-sm">
        {tokenInfo.tokenMarketTokens}
      </span>
    </div>
  </div>

  <hr className="border-dashed border-gray-200 my-4" />

  {/* Section 2: Token Specifics */}
  <div className="space-y-3 mb-6">
    <div className="flex justify-between">
      <span className="text-gray-500">Token Name</span>
      <span className="text-blue-900 font-bold">{tokenInfo.token}</span>
    </div>
    <div className="flex justify-between">
      <span className="text-gray-500">Price per Token</span>
      <span className="text-blue-900 font-bold">{tokenInfo.tokenPrice} ETH</span>
    </div>
  </div>

  {/* Section 3: User Wallet (Highlighted) */}
  <div className="bg-green-50 border border-green-100 p-4 rounded-xl flex justify-between items-center">
    <div>
      <p className="text-xs text-green-600 font-semibold uppercase">Your Wallet</p>
      <p className="text-green-800 font-bold text-lg">{tokenInfo.balance}</p>
    </div>
    <span className="text-green-600 text-sm font-medium bg-white px-2 py-1 rounded border border-green-200 shadow-sm">
      {tokenInfo.token}
    </span>
  </div>

</div>


      </div>

      {/* --- Action Forms Container --- */}
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 space-y-6">
        
       

           
          
          {/* send eth to other user  */}
           <form
         onSubmit={(e)=>{
          e.preventDefault();
        }}
        className="flex flex-col space-y-2">
          <label className="text-sm font-semibold text-gray-700 ml-1">Transfer</label>
          <div className="flex gap-2">
            <input
              type="string"
              placeholder="address"
               onChange={(e)=>{
                setSendEthTo((prev) =>{
                  return{
                    ...prev , to : e.target.value
                  }
                })
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
            />

             <input
              type="number"
              placeholder="Amount"
               onChange={(e)=>{
                setSendEthTo((prev) =>{
                  return{
                    ...prev , eth : e.target.value
                  }
                })
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
            />

          
            <button
            onClick={()=>{
            trnsfer();
            }}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-lg transition duration-200">
              transfer
            </button>
          </div>


        </form>






        {/* Buy Form */}
        <form 
        onSubmit={(e)=>{
          e.preventDefault();
        }}
        className="flex flex-col space-y-2">
          <label className="text-sm font-semibold text-gray-700 ml-1">Buy Token</label>
          <div className="flex gap-2">
            <input
              type="number"
              onChange={(e)=>{
                setToken(e.target.value);
              }}
              placeholder="Amount"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
            />
            <button
            onClick={()=>{
              buyToken();
            }}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition duration-200">
              Buy
            </button>
          </div>
        </form>

        <hr className="border-gray-100" />


    



        {/* Sell Form */}
        <form
         onSubmit={(e)=>{
          e.preventDefault();
        }}
        className="flex flex-col space-y-2">
          <label className="text-sm font-semibold text-gray-700 ml-1">Sell Token</label>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Amount"
               onChange={(e)=>{
                setToken(e.target.value);
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
            />
            {/* Fixed Label: Changed 'Buy' to 'Sell' */}
            <button
            onClick={()=>{
              sellToken();
            }}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-lg transition duration-200">
              Sell
            </button>
          </div>
        </form>

        <hr className="border-gray-100" />

        {/* Approve Form */}
        <form
         onSubmit={(e)=>{
          e.preventDefault();
        }}
        className="flex flex-col space-y-2">
          <label className="text-sm font-semibold text-gray-700 ml-1">Approve Allowance</label>
          <div className="flex gap-2">
            <input
              type="number"
              onChange={(e)=>{
                setToken(e.target.value);
              }}
              placeholder="Spender Amount"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
            {/* Fixed Label: Changed 'Buy' to 'Approve' */}
            <button
            onClick={()=>{
              approve();
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200">
              Approve
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}

export default TokenMarket;
