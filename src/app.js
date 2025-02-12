const express=require("express")
const {adminAuth}=require("./middlewares/auth")
const app=express();

app.use("/admin",adminAuth)

app.get("/admin/getAllData",(req,res,next)=>{
    //logic to fetch the data from the database
    res.send("got all the data")
})

app.get("/admin/deleteData",(req,res)=>{
    //logic to delete
    res.send("deleted all the datas")
})

app.listen(3000,()=>{
    console.log("server iistening on port 3000");
    
})