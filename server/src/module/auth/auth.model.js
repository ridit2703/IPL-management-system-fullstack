import mongoose from "mongoose"

const userSchema=new mongoose.Schema({
    id:{
        type:Number,
        unique:true,

    },
    name:{
        type:String,
        unique:true,
        trim:true,
        required:[true,"User name required"],
        minlenght:2,
        maxlength:35

    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        required:[true,"email is required"]
        
    },
    password:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        required:[true,"password is required"],
        select:false
        
    },
    role:{
        type:String,
        enum:["admin","owner","player","user"],
        default:"user"
    }

},{timestamps:true})

export default mongoose.model("User",userSchema)