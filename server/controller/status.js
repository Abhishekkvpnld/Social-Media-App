export const userStatus = (req,res)=>{
    try{
console.log(req.body,'*****userID*****',userId)
    }catch(err){
        res.status({message:err})
    }
}