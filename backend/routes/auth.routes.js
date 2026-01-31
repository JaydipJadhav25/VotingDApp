import { Router } from "express";
import { verifyMessage } from "ethers"
import jwt from "jsonwebtoken"

const router = Router();

router.get("/", (req, res) => {
  return res.send("<h1>THis is authentication route !</h1>");
});

router.post("/auth/:account", async(req, res) => {
  try {
    const { account } = req.params;
    const { signature } = req.body;

    if (!account || !signature) {
      return res.status(400).json({
        message: "Account and signatur is required !",
      });
    }
    console.log("user data : " , account , signature);

    //to verify message
    const message = "welcome to voting Dapp , you accespt terms and conditions!";
//   const recoveredAddress = ethers.utils.verifyMessage(message, signature);  //this is fetures is not support in ethersV6  ,inb v6 remove 
//utils  , now they provide direct access

   const recoveredAddress = verifyMessage(message ,signature);
    console.log("recoveAddress : " , recoveredAddress);

    //check use and this signture user is  same
    if (recoveredAddress.toLowerCase() !== account.toLowerCase()) {
      return res.status(401).json({
      message: "Account and Signture is not same , UnAuthorized Access!",
    });
    }

    //gen jwt token
    const token =  await jwt.sign({
        account : recoveredAddress
    } , "superMan@123");


    return res.status(200)
    .cookie("auth" , token)
    .json({
      message: "User Authentication successfully !",
      auth : token
    });

  } catch (error) {
    console.log("error : " , error);
    return res.status(400).json({
      message: "User Authentication Error!",
      error  : error
    });

  }
});

export default router;
