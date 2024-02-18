
export const userStatus = (req,res)=>{
    try{

console.log(req.params)

    }catch(err){

        res.status({message:err})
    }
}