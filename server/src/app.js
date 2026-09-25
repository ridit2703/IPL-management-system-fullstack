import express from "express";

const app=express()

app.get("/",(req,res)=>{
    res.json({message:"bana ;iya yanaha bhi"})
})


export default app;