import mongoose from 'mongoose';
import ApiError from '../utils/api-error.js';

const  connectDB=async()=>{
    try{
        const conn=await mongoose.connect(process.env.MONGODB_URI)
    }
    catch(error){
          console.log("MongoDB connection error:", error);
        throw error;
    }

}
export {connectDB}