const express=require("express");
const { userAuth } = require("../middlewares/auth");
const User=require("../models/user")
const ConnectionRequest= require("../models/connectionRequest")

const userRouter=express.Router();

userRouter.get("/user/requests/received",userAuth,async (req,res)=>{
    try{
        const loggedInUser=req.user;

        const receivedRequest= await ConnectionRequest.find({
        toUserId:loggedInUser._id,
        status:"interested"
        }).populate("fromUserId",["firstName","lastName","photoUrl","age","gender"])
        res.json({message:"data fetched successfully", data:receivedRequest})
    }
    catch(err){
        res.status(400).send("Error!!! "+err.message)
    }


    
    
})

userRouter.get("/user/connections",userAuth,async (req,res)=>{
    try{
        const loggedInUser=req.user;

        const allConnections=await ConnectionRequest.find({
        $or:[
            {fromUserId:loggedInUser._id, status:"accepted"},
            {toUserId:loggedInUser._id, status:"accepted"}
        ]
        }).populate("fromUserId",["firstName","lastName","photoUrl","age","gender"])
        .populate("toUserId",["firstName","lastName","photoUrl","age","gender"])

        const data =allConnections.map(item=>{
            if(item.fromUserId._id.toString()===loggedInUser._id.toString()){
                return item.toUserId;
            }
            return item.fromUserId;
        })
        res.json(data)
    }
    catch(err){
        res.status(400).send("Error!!!! "+err.message)
    }
    

})

userRouter.get("/user/feed",userAuth,async(req,res)=>{
    try{
        const loggedInUser=req.user
        
        let limit=parseInt(req.query.limit)||15;
        limit=limit>50? 50 :limit

        const page=parseInt(req.query.page)||1;
        const skip= (page-1)*limit

        const myConnections= await ConnectionRequest.find({
            $or:[
                {fromUserId:loggedInUser._id},
                {toUserId:loggedInUser._id}
            ]
        }).select("fromUserId toUserId")

        const hideUsersFromFeed=new Set();
        myConnections.forEach(item=>{
            hideUsersFromFeed.add(item.fromUserId.toString())
            hideUsersFromFeed.add(item.toUserId.toString())
        })  
    
        const showUsersToFeed=await User.find({
            $and:[
                {_id:{$nin:Array.from(hideUsersFromFeed)}},
                {_id:{$ne:loggedInUser._id}}
            ]
        }).select("firstName lastName photoUrl age gender about").skip(skip).limit(limit)

        res.send(showUsersToFeed)
    }
    catch(err){
        res.status(400).send("Error!!!! "+err.message)
    }
    
})

module.exports=userRouter;