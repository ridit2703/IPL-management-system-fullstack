import mongoose from "mongoose";

let teamSchema=new mongoose.Schema({
   
    name:{
        type:String,
        required:true,
        unique:true,
        triem:true
    },
    shortName:{
        type:String,
        required :true,
        uppercase:true,
        trim:true,
        unique:true

    },
    logo:{
        type:String,
        required:true,

    },



},{timestamps:true})

export default mongoose.model("Team",teamSchema);