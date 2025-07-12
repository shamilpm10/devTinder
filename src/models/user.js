const mongoose=require("mongoose")
const validator=require("validator")
const jwt=require("jsonwebtoken")
const bcrypt =require("bcrypt")

const userSchema= new mongoose.Schema({
    firstName:{
        type:String,
        //required:true,
        minLength:3,
        
    },
    lastName:{
        type:String,
        maxLength:18
    },
    email:{
        type:String,
        //required:true,
        unique:true,
        lowercase:true,
        trim:true,
        validate(value){
           if(!validator.isEmail(value)) {
            throw new Error ("email is not valid: "+value)
           }
        }
    },
    password:{
        type:String,
        //required:true,
        validate(value){
            if(!validator.isStrongPassword(value)) {
                throw new Error ("password is not strong: "+value)
               }
        }
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
        default:"https://thumb.ac-illust.com/c7/c7badbfa746c5372783179470aa9ef2b_t.jpeg",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error ("url is not valid"+value) 
            }
        }
    },
    about:{
        type:String,
        
    }
},
{
    timestamps:true
}
)

userSchema.methods.validatePassword= async function(stringPassword){
    const user=this;

    const isPassswordCorrect= await bcrypt.compare(stringPassword,user.password)
    return isPassswordCorrect
}

userSchema.methods.getJWT= async function(){
    const user=this;
    const token= await jwt.sign({_id:user._id},"namasteNODE007$123")
    return token;
}

module.exports= mongoose.model("User",userSchema)