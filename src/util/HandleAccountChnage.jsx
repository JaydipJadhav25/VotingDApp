export const handleAccountChange = async(setWeb3State) =>{

    //to get current account that is chnages :
      const accounts = await window.ethereum.request({
           "method" :"eth_requestAccounts"
       });//this retunr array of accounts
       //3. get only selected account
       const selectedAccount = accounts[0];

       console.log("call account chnage ....: " , accounts);

       //update in state
       setWeb3State((prev) =>({...prev , selectedAccount}));
       
};