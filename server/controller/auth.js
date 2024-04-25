import bcrypt from "bcrypt";
import Jwt  from "jsonwebtoken";
import User from "../models/user.js";


/* REGISTER USER */
export const register = async (req,res)=>{
try{
const {
    firstName,
    lastName,
    email,
    password,
    picturePath,
    friends,
    location,
    occupation
} = req.body;

const salt = await bcrypt.genSalt();
const hashedPassword = await bcrypt.hash(password,salt)

const newUser = new User(
    {
        firstName,
        lastName,
        email,
        password : hashedPassword,
        picturePath,
        friends,
        location,
        occupation,
        viewesProfile:Math.floor(Math.random()*1000),
        impressions:Math.floor(Math.random()*1000)
    }
)

const savedUser = await newUser.save();
res.status(201).json({message:"Account Created Successfully...",savedUser}) 

}catch(err){
res.status(500).json({error:err.message})
}
}


/* LOGGING IN */
export const login = async(req,res)=>{
try{

const {email,password} = req.body

const user = await User.findOne({email:email})
if(!user)return res.status(400).json({msg:'User does not exist..!'})

const isMatch = await bcrypt.compare(password,user.password);
if(!isMatch)return res.status(400).json({msg:"Invalid Credential...!"})

const token = Jwt.sign({id : user._id},process.env.JWT_SECRET);
delete user.password;

res.status(200)
.json({token,user,message:`Logged In Successfully.Welcome Back ${user.firstName}...`})

}catch(err){
res.status(500).json({message:err.message})
}
}