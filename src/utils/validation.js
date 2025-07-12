const validateSignupData=(req)=>{
    const{firstName,lastName,email,password}=req.body;
    if(!firstName||!lastName||!email||!password){
        throw new Error("name is required")
    }
    
    
}

const validateEditData= (req)=>{
    const allowedEdit=["age","gender","photoUrl","about","firstName","lastName"]
    const isvaliddata= Object.keys(req.body).every(key=>allowedEdit.includes(key))
    return isvaliddata;
}
module.exports={validateSignupData,validateEditData}