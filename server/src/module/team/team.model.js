import mongoose from "mongoose";

let teamSchema=new mongoose.Schema({
    id:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true,
        unique:true
    },

},{timestamps:true})

export default mongoose.model("Team",teamSchema);