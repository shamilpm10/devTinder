const express =require("express");
const bcrypt=require("bcrypt")
const User = require("../models/user");
const { validateSignupData } = require("../utils/validation");

const authRouter=express.Router()

authRouter.post("/signup",async(req,res)=>{
    
    try{
        validateSignupData(req)
        const {firstName,lastName,email,password}=req.body;
        const passwordHash=await bcrypt.hash(password,10)
        const user=new User({
            firstName,
            lastName,
            email,
            password:passwordHash
        })

        await user.save();
        res.send("data added successfully")
    } catch(err){
        res.status(400).send("error saving  the data "+err.message)
    }
    


})

authRouter.post("/login",async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await User.findOne({email:email})
        if(!user){
            throw new Error("invalid credentials ")
        }
        const isPassswordCorrect= await user.validatePassword(password)
        if(isPassswordCorrect){
            const token=await user.getJWT()
            //console.log(token);
            
            res.cookie("token",token,{expires: new Date(Date.now() + 8 * 3600000)})
            res.send("login successful")
        
        }else{
            throw new Error("invalid credentials")
        }
    } catch(err){
        res.status(400).send("cannot login"+err.message)
    }    
})

module.exports=authRouter;