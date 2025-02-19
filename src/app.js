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

app.get("/feed",async(req,res)=>{
    try{
        const users= await User.find({})
        
        if(!users.length){
            res.status(404).send("data cannot be found")
            
        }
        else{
            res.send(users)
        }
    }catch(err){
        console.log("something went wrong");
        
    }
})

app.get("/user",async(req,res)=>{
    try{
        const users=await User.find({age:req.body.age})
        if(users.length){
            res.send(users)
        }
        else{
            res.status(404).send("cannot find the data")
        }

    } catch(err){
        res.status(400).send("something went wrong"+err.messsge)
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

