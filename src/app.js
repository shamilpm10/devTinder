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
        res.status(400).send("error saving  the data "+err.message)
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

app.delete("/user",async (req,res)=>{
    const id=req.body._id;
    try{
        const user=await User.findByIdAndDelete(id)
        //console.log(user);
        
        res.send("user deletd successfully")
    } catch(err){
        res.status(400).send("something went wrong in deleting"+err.messsge)

    }
})

app.patch("/user/:userId",async(req,res)=>{
    const id=req.params?.userId
    const data=req.body
    try{
        
        const allowedUpdate= ["age","gender","photoUrl"]
        const isUpdate= Object.keys(data).every((k)=>allowedUpdate.includes(k))
        if(!isUpdate) {
            throw new Error("update not allowed")
        }
        const user= await User.findByIdAndUpdate(id,data,{returnDocument:"after",runValidators:true})
        //console.log(user);
        
        res.send("data updated successfully")
    }
    catch(err){
        res.status(400).send(" update failed "+ err.messsge)

    }
    
})

app.patch("/user1",async(req,res)=>{
    try{
        const emailId=req.body.email
        const user= await User.findOneAndUpdate({email:emailId},req.body,{returnDocument:"before"})
        console.log(user);
        
        res.send("data updated successfully")
    }
    catch(err){
        res.status(400).send("something went wrong in deleting"+err.messsge)

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

