"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage(){
    const router=useRouter();
    const [user,setUser]=useState({
        email:"",
        password:"",
    })
    const [buttonDisabled,setButtonDisabled]=useState(false);
    const [loading,setLoding]=useState(false);
    useEffect(()=>{
        if(user.email.length>0 && user.password.length>0){
           setButtonDisabled(false);
        }else{
           setButtonDisabled(true);
        }
   },[user])
    const onLogin=async ()=>{
      try {
        setLoding(true);
      const response= await axios.post("/api/users/login",user);
      console.log("Login success",response.data);
      toast.success("Login sucessfully")
      router.push("/profile");
      
      } catch (error:any) {
        console.log("Login failed",error.message);
    toast.error(error.message)    
      }
      finally{
        setLoding(false);
      }
    }
    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading ? "Processing":"Login"}</h1>
            <hr />
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
               onClick={onLogin}
               className="p-2 border border-gray-300 rounded-lg
                focus:outline-none focus:border-
                gray-600">Login here</button>
                <Link href="/signup">Visti Singup page</Link>
        </div>
    )
}