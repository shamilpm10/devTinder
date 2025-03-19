const mongoose=require("mongoose")

const userSchema= new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:3,
        
    },
    lastName:{
        type:String,
        maxLength:18
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    },
    password:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        min:18
    },
    gender:{
        type:String,
        validate(value){
            if(!["male","female","other"].includes(value)){
                throw new Error ("gender data is not valid")
            }
        }
    },
    photoUrl:{
        type:String,
        default:"asdfgkjkj/cdn"
    }
},
{
    timestamps:true
}
)

module.exports= mongoose.model("User",userSchema)