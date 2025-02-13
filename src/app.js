const express=require("express")
const {adminAuth}=require("./middlewares/auth")
const app=express();

app.get("/admin/getAllData",(req,res,next)=>{
  // try{
    console.log("enetred to /getalldata");
    
    throw new Error("thettt")
    res.send("sent succesfylly")  
//    }
//    catch(err){
//     res.status(500).send("error occured in catch")
//    }
      
})

app.use("/admin",(req,res,next)=>{
    console.log("enetred to admin");
     res.send("admin data")
    //throw new Error("thettt")
    // res.status(500).send("admin error")    
 })

app.use("/",(err,req,res,next)=>{
    
    console.log("enetred to slash/");
    res.status(500).send("error occured")

//res.send("chakaaaa")
})

app.listen(3000,()=>{
    console.log("server iistening on port 3000");
    
})