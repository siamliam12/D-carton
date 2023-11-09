"use client"
import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState ,FormEvent} from 'react'
import { FaGoogle } from "react-icons/fa";

const LoginPage = () => {
  const router = useRouter();
  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")


  const handleSubmit= async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    await axios.post('http://localhost:8000/api/auth/login/',formData,{
      headers:{
        "Content-Type": "multipart/form-data",
      }
    }) .then((response) => {
      // handle the response
          console.log(response);
          router.push('/')
        })
        .catch((error) => {
          // handle errors
          console.log(error);
        });
  }


  return (
    <div className='flex justify-center items-center h-screen '>
    <div className="img">
      <Image src='/register.jpg' alt='login.png' width={500}
        height={300}
        priority />
    </div>
    <form className="form  h-auto" onSubmit={handleSubmit}>
      <h1 className="p-4 text-2xl">Login</h1>
      <div className="grid grid-rows-2 grid-flow-col gap-2">
        <input className="my-1 w-64 h-10  px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 text-gray-700 placeholder-gray-400" placeholder='Username' type='text' name='username' value={username} onChange={(e)=>setUsername(e.target.value)}>
        </input>
        <input className="my-1 w-64 h-10  px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 text-gray-700 placeholder-gray-400" placeholder='Password' type='password'
        name='password' value={password} onChange={(e)=>setPassword(e.target.value)}>
        </input>
      </div>
    <button className=" my-2 inline-flex items-center bg-indigo-500 text-white border-0 py-1 px-3 focus:outline-none hover:bg-indigo-200 hover:text-black rounded text-base mt-4 md:mt-0" type='submit'>
          Login
          </button>
    </form>
  </div>
  )
}

export default LoginPage