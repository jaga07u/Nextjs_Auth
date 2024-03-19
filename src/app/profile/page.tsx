"use client"
import axios from "axios"
import Link from "next/link"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import React,{ useState } from "react"



export default function ProfilePage(){
    const route=useRouter();
    const [data,SetData]=useState("nothing")
   const  logout=async()=>{
    try {
         await axios.get('/api/users/logout');
         toast.success("Logout successfully");
         route.push('/login');
    } catch (error:any) {
        console.log(error.message);
    toast.error(error.message);        
        
    }
   }
   const getUserDetails=async ()=>{
     const res= await axios.get('/api/users/me');
     console.log( res.data.data._id);
     SetData(res.data.data._id);
   }
    return (
        <div className="flex flex-col items-center justify-normal min-h-screen py-2">

            <h1>profile</h1>
            <hr />
            <p>Profile page</p>
            <h2 className="p-3 rounded bg-green-500 ">{data === 'nothing' ? "Noting" : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
           <hr />
           <button
           className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
           onClick={logout}
           >Logout</button>
           <button
           className="bg-purple-500 mt-4 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
           onClick={getUserDetails}
           >GetUserDetails</button>
        </div>
    )
}