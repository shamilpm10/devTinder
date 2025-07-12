const express= require("express");
const {userAuth}=require("../middlewares/auth");

const User=require("../models/user");
const { validateEditData } = require("../utils/validation");

const profileRouter= express.Router()

profileRouter.get("/profile/view",userAuth,async (req,res)=>{
    try{
        const user=req.user;
        res.send(user)
    } catch(err){
        res.status(400).send("cannot get profile, please login "+err.message)
    }   
    
})

profileRouter.patch("/profile/edit",userAuth,async (req,res)=>{
    try{
        if(!validateEditData(req)){
            throw new Error("given data is not valid")
        }
        const loggedInUser=req.user
        Object.keys(req.body).forEach(key=>loggedInUser[key]=req.body[key])
        const data= await loggedInUser.save()
        //await User.findByIdAndUpdate(loggedInUser._id,req.body)
        res.json({message:"profile edited successfully",data})
    }
    catch(err){
        res.status(400).send("something went wrong"+err.message)
    }
    
})

module.exports= profileRouter;
