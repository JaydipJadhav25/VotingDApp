import {model , Schema} from "mongoose"



const candidateSchema = new Schema({
    accountAddress  : {
        type : String,
        required  :true
    } ,
    profile : {
        type : String ,
        defult : "/"
    }
})



export const candidateModel = model("Candidate" , candidateSchema);