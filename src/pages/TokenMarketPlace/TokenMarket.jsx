import { useEffect, useState } from "react";
import WalletRequiredState from "../../components/WalletRequiredState";
import { useWeb3State } from "../../hooks/useWeb3State";
import { ethers } from "ethers";
import { contractInstaceTokenMarket } from "../../smartContract/marketContract.config";
import { toast } from "sonner";
import { contractInstaceToken } from "../../smartContract/tokneContract.config";
// import { useWallet } from "../../context/WalletConnection";

function TokenMarket() {
  const { provider, signer, selectedAccount } = useWeb3State();

  const [loading , setLoading ] = useState(false);
  
  const [ tokenInfo, setTokenInfo ] = useState({
    balance: 0,
    token: null,
    tokenPrice : 0 ,
  });


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
          provider,
        );
        //get info fron intnce
        // console.log("contracrinstce : " , constractInstace);
        setTokenInstance(constractInstace);//set token instance
        const userBalace = await constractInstace.balanceOf(selectedAccount);
        console.log("userbalance : " , userBalace);
        setTokenInfo({
          balance: Number(userBalace),
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
        setTokenInfo((prev) => {
          return{
            ...prev ,tokenPrice : Number(tokenPrice)
          }
        });
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
    const price = await tokenMarketInstance.calculateTokenPrice(token);

    console.log("price : " , Number(price));

    // const tx = await tokenMarketInstance.buyGLDToken(token ,{
    //   value : Number(price) //This becomes msg.value
    // });
     
    console.log("token : " , token);

     const tx = await tokenMarketInstance.buyGLDToken(token, {
      value: price, //  Correct
    });

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
    const tx = await tokenMarketInstance.sellGLDToken(token);

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

    // Send transaction
    const tx = await  tokenInstance.approve(contractInstaceTokenMarket.address , token);
    toast.info("Transaction sent. Waiting for confirmation... ⏳");
    // Wait for confirmation
    const receipt = await tx.wait(1); // 1 confirmation

    console.log("Transaction confirmed:", receipt);

    toast.success("Token approve successfully ✅");

  } catch (error) {
    console.error("token approve Token Error:", error);

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
        <div className="p-6 space-y-2 bg-white">
          <div className="flex justify-between border-b border-gray-100 pb-2">
            <span className="text-gray-500 font-medium">Token Name</span>
            <span className="text-blue-900 font-bold">{tokenInfo.token}</span>
          </div>
          <div className="flex justify-between border-b border-gray-100 pb-2">
            <span className="text-gray-500 font-medium">Price</span>
            <span className="text-blue-900 font-bold">${tokenInfo.tokenPrice} eths</span>
          </div>
          <div className="flex justify-between pt-2">
            <span className="text-gray-500 font-medium">Your Balance</span>
            <span className="text-green-600 font-bold">{tokenInfo.balance} {tokenInfo.token}</span>
          </div>
        </div>
      </div>

      {/* --- Action Forms Container --- */}
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 space-y-6">
        
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
