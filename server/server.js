import express from "express";
import "dotenv/config"
import app from "./src/app.js"
import { connectDB } from "./src/common/config/db.js";

const start=async()=>{
    try{
        const PORT=process.env.PORT || 5454

        // connectdb

        await connectDB();

        app.listen(PORT,()=>{
            console.log(`server is running at ${PORT}`)
        })

    }
    catch(error){
        console.log("server error",error)

    }

}
start();