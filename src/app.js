const express=require("express")
const app=express();

app.use("/demo",(req,res)=>{
    res.send("welcome to the server")
})

app.listen(7777,()=>{
    console.log("server iistening on port 7777");
    
})