const adminAuth=(req,res,next)=>{
    const token="jklm"
    const isAuthorized=token==="jklm"
    if(!isAuthorized){
        res.status(401).send("auth failed")
    } else{
        next()
    }
    
    
}
module.exports={adminAuth}