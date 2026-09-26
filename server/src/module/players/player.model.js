import mongoose from "mongoose"

const playerSchemaSchema=new mongoose.Schema({
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
     teamId:{
        type:mongoose.Schema.Types.ObjectId,
        reference:teamId
        
     },
    matchesPlayed:{
        type:Number,
        required:true,
        
    },
    wickets:{
        type:Number,
        required:true
    },
    runs:{
        type:Number,
        required:true,
    }
    

},{timestamps:true})

export default mongoose.model("Player",playerSchema)