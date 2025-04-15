const validateSignupData=(req)=>{
    const{firstName,lastName,email,password}=req.body;
    if(!firstName||!lastName||!email||!password){
        throw new Error("name is required")
    }
    
    
}
module.exports={validateSignupData}