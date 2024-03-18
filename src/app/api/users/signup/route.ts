import {connect} from "../../../../dbConfig/dbConfig"
import User from "../../../../models/userModel"
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from "bcryptjs"
import { sendEmail } from "@/helpers/mailer";

connect();


export async function POST(request :NextRequest){
  try {
   const reqbody= await request.json();
   const {username,email,password}=reqbody;
  // console.log(reqbody);
   
   //check if user already exist
 const user= await User.findOne({email});
 if(user){
    return NextResponse.json({error:"users already exists"},{status:400});
 }
   const salt=await bcryptjs.genSalt(10);
   const hashPassword=await bcryptjs.hash(password,salt);
 const newUser= new User({
    username,
    email,
    password:hashPassword
  });
 const savedUser= await newUser.save();
 console.log(savedUser);
 //send verify email
 await sendEmail({email,emailType:"VERIFY",userId:savedUser._id});
 return NextResponse.json({
    message:"User created successfy=ullu",
    success:true,
    savedUser
 })
 
  } catch (error: any) {
    return NextResponse.json({error:error.message},
        {status:500})
  }
}