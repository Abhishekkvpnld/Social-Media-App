import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        firstName : {
            type:String,
            required:true,
            min:2,
            max:30,
        },
        lastName : {
            type:String,
            required:true,
            min:2,
            max:30
        },
        email:{
            type:String,
            max:50,
            unique:true,
            required:true
        },
        password:{
            type:String,
            required:true,
            min:5
        },
        picturePath:{
            type:String,
            default:""
        },
        friends:{
            type:Array,
            default:[]
        },
        location:String,
        occupation:String,
        viewesProfile:Number,
        impressions:Number,
    },{
        timestamps:true
    }
)
const User = mongoose.model('user',userSchema);
export default User;