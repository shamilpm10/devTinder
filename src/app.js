const express=require("express")
const app=express();



app.get("/abc",(req,res)=>{
    res.send({firstname:"maguire",lastname:"goat"})
})

// app.get("/user/abc",(req,res)=>{
//     res.send("userabc")
// })

app.delete("/user",(req,res)=>{
    res.send("data deleted")
})
// app.use("/user",(req,res)=>{
//     res.send("hellooo")
// })

app.post("/user",(req,res)=>{
    //data saved to database
    res.send("data saved successfully to database")
})








app.listen(3000,()=>{
    console.log("server iistening on port 7777");
    
})