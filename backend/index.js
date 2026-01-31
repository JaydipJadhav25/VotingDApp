import express from "express"
import cors from "cors";
import authernticationRouter from "./routes/auth.routes.js"
import { userAuth } from "./middleware/auth.middleware.js";

const PORT = 3000;
const app  = express();



app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




app.get("/" , (req, res)=>{
    res.send("<h1>Voting DApp !</h1>")
});



app.use("/user" ,authernticationRouter );


app.get("/main" , userAuth , (req , res)=>{
    return res.json({
        message   : "ok"
    });
});

app.listen(PORT , ()=>{
    console.log(`server is starting on POrt : ${PORT}`);
})