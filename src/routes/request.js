const express= require("express")
const { userAuth } = require("../middlewares/auth")
const User=require("../models/user")
const ConnectionRequest=require("../models/connectionRequest")

const requestRouter=express.Router()

requestRouter.post("/request/send/:status/:toUserId",userAuth,async(req,res)=>{
    
    try{
        const fromUserId=req.user._id;
        const toUserId=req.params.toUserId;
        const status=req.params.status;

        const allowedStatus=["ignored","interested"]
        
        if(!allowedStatus.includes(status)){
            throw new Error("invalid status type")
        }

        const validId=await User.findById(toUserId);
        if(!validId){
            throw new Error("user does not exist")
        }

        const existingConnection=await ConnectionRequest.findOne({
            $or:[
                {fromUserId:fromUserId, toUserId:toUserId},
                {fromUserId:toUserId, toUserId:fromUserId}
            ]
        })

        if(existingConnection){
            throw new Error("connection already exist")
        }

        const connectionRequest= new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        })

        const data=await connectionRequest.save()
        res.json({
            message:"connection done successfully",
            data
        })
    }
    catch(err){
        res.status(400).send("Error!!!"+err.message)
    }


})

requestRouter.post("/request/review/:status/:requestId",userAuth,async (req,res)=>{
    try{
        const loggedInUser=req.user
        const {status,requestId}=req.params

        const allowedStatus=["accepted","rejected"]
        if(!allowedStatus.includes(status)){
            return res.status(400).json({message:"status is not valid"})
        }
        const connectionRequest=await ConnectionRequest.findOne({
            _id:requestId,
            toUserId:loggedInUser._id,
            status:"interested"
        })
        if(!connectionRequest){
            return res.status(400).json({message:"connection request doesnt exist"})
        }

        connectionRequest.status=status
        const data=await connectionRequest.save();
        res.json({
            message:"Request"+status+"successfully",
            data
        })
    }
    catch(err){
        res.status(400).send("Error!!! "+err.message)
    }
})

module.exports=requestRouter;