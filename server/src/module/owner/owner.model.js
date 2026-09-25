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
     company:{
        type:String,
        unique:true,
        trim:true,
        required:[true,"Company name required"],
        minlenght:2,
        maxlength:35

    }

},{timestamps:true})

export default mongoose.model("Owner",ownerSchema)