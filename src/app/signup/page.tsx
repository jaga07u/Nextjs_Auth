"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignupPage(){
    const router=useRouter();
    const [user,setUser]=useState({
        email:"",
        password:"",
        username:""
    })
    const [buttonDisabled,setButtonDisabled]=useState(false);
    const [loading,setLoding]=useState(false);
    useEffect(()=>{
         if(user.email.length>0 && user.password.length>0 && user.username.length>0){
            setButtonDisabled(false);
         }else{
            setButtonDisabled(true);
         }
    },[user])
    const onSignup=async ()=>{
      try {
        setLoding(true);
       const response= await axios.post("api/users/signup",user);
       console.log("Signup user",response.data);
       router.push("/login");
      } catch (error:any) {
        console.log("Signup failed");
        
        toast.error(error.message);
      }finally{
        setLoding(false);
      }
    }
    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading? "Processing":" Signup"}</h1>
            <hr />
            <label htmlFor="username">username</label>
            <input 
            className="text-black"
            type="text"
             id="username"
             value={user.username}
             onChange={(e)=>setUser({...user,username:e.target.value})}
             placeholder="username"
               />
                <label htmlFor="username">email</label>
            <input 
            className="text-black"
            type="text"
             id="email"
             value={user.email}
             onChange={(e)=>setUser({...user,email:e.target.value})}
             placeholder="email"
               />
                <label htmlFor="username">password</label>
            <input 
            className="text-black"
            type="password"
             id="password"
             value={user.password}
             onChange={(e)=>setUser({...user,password:e.target.value})}
             placeholder="password"
               />
               <button 
               onClick={onSignup}
               className="p-2 border border-gray-300 rounded-lg
                focus:outline-none focus:border-
                gray-600">{buttonDisabled? "No signup":"Singup"}</button>
                <Link href="/login">Visti Login page</Link>
        </div>
    )
}