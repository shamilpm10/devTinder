const express=require("express")
const connectDB=require("./config/database")
const User=require("./models/user")
//const {adminAuth}=require("./middlewares/auth")
const app=express();

app.post("/signup",async(req,res)=>{
    const userObj={
        firstName:"martin",
        lastName:"odegaard",
        email:"martin@odegaard.com",
        password:"ozilregen",
        age:25
    }
    const user=new User(userObj)
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

