import mongoose from "mongoose";


const UserSchema=new mongoose.Schema(
    {
      username:{
        type:String,
        required:[true,"please provide a username"]
      },
      email:{
        type:String,
        required:[true,"please provide a email"]
      },
      password:{
        type:String,
        required:[true,"Please provide a password"]
      },
      isVerified:{
        type:Boolean,
        default:false
      },
      isAdmin:{
        type:Boolean,
        default:false
      },
      forgotPasswordToken:String,
      forgotPasswordTokenExpiry:Date,
      verifyToken:String,
      verifyTokenExpiry:Date
   }
)

const User=mongoose.models.users || mongoose.model("users",UserSchema);

export default User;