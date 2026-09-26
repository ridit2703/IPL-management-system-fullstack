import mongoose from "mongoose"

const ownerSchema=new mongoose.Schema({
    id:{
        type:Number,
        unique:true,

    },
    name:{
        type:String,
        unique:true,
        trim:true,
        required:[true,"Owner name required"],
        minlenght:2,
        maxlength:35

    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        
    },
    password:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        
    },
    role:["admin","owner","player","user"]

},{timestamps:true})

export default mongoose.model("Owner",ownerSchema)