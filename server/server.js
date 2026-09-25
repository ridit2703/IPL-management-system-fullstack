import express from "express";
import "dotenv/config"
import app from "./src/app.js"

const start=async()=>{
    try{
        const PORT=process.env.PORT || 5454

        // connectdb

        app.listen(PORT,()=>{
            console.log(`server is running at ${PORT}`)
        })

    }
    catch(error){
        console.log("server error",error)

    }

}
start();