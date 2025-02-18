const mongoose=require("mongoose")

const connectDB=async ()=>{
   await  mongoose.connect("mongodb+srv://derick:107SrJgwReT7yH8D@learnmern.c3zsv.mongodb.net/devTinder")

}

module.exports=connectDB