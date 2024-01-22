import JWT from 'jsonwebtoken';

export const verifyToken = (req,res,next)=>{
try{

let token = req.header("Autherization");
if(!token){
    return res.status(403).json({msg:"Aceess Denied"})
}

if(token.startWith("Bearer ")){
token = token.slice(7,token.length).trimLeft();
}

const verified = JWT.verify(token,process.env.JWT_SECRET)
req.user = verified;

next()

}catch(err){
    res.status(500).json({error:err.message})
}
} 