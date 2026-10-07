import mongoose from "mongoose"
import bcrypt from "bcrypt"
 
const userSchema=new mongoose.Schema({
    // id:{
    //     type:Number,
    //     unique:true,

    // },
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

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return ;

    this.password = await bcrypt.hash(this.password, 10);
    
});

userSchema.methods.comparePassword=async function(clearTextPassword){
    return bcrypt.compare(clearTextPassword,this.password)
}

export default mongoose.model("User",userSchema)