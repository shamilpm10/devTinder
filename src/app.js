const express=require("express")
const app=express();



app.use("/abc",
    (req,res,next)=>{
        console.log("route handler 1");
         //res.send("response 1")
        next()
    },
    (req,res,next)=>{
        console.log("route handler 2");
        //res.send("response 2")
        next()
    },
    (req,res,next)=>{
        console.log("route handler 3");
        res.send("response 3")
        //next()
    },
)



app.listen(3000,()=>{
    console.log("server iistening on port 3000");
    
})