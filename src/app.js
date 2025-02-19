const express=require("express")
const connectDB=require("./config/database")
const User=require("./models/user")
//const {adminAuth}=require("./middlewares/auth")
const app=express();

app.use(express.json())

app.post("/signup",async(req,res)=>{
    
    const user=new User(req.body)
    try{
        await user.save();
        res.send("data added successfully")
    } catch(err){
        res.status(400).send("error saving  the data"+err.message)
    }
    


})

connectDB().then(()=>{
    console.log("database connection established");
    app.listen(3000,()=>{
        console.log("server iistening on port 3000");
        
    })
})
.catch((err)=>console.error("database connection failed")
)

