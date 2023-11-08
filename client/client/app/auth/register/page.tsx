
"use client"
import { useForm } from 'react-hook-form';
import Image from 'next/image'
 
const RegisterPage = () => {
  
  const {register,handleSubmit} = useForm()

  const onSubmit = async (data:any) =>{
    const formData = new FormData();
    formData.append("file", data.file[0]);

    const res = await fetch("http://localhost:8000/api/auth/register/", {
        method: "POST",
        body: formData,
    }).then((res) => res.json());
    alert(JSON.stringify(`${res.message}, status: ${res.status}`));
  }


  return (
    <div className='flex justify-center items-center h-screen '>
      <div className="img">
        <Image src='/login.jpg' alt='login.png' width={500}
          height={300}
          priority />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="form  h-auto">
        <h1 className="p-4 text-2xl">Sign Up</h1>
        <div className="grid grid-rows-4 grid-flow-col gap-4">
          <input className="my-1.5 mr-5 w-64 h-10  px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 text-gray-700 placeholder-gray-400" placeholder='Full Name' type='text' {...register("name")}>
          </input>
          <input className="my-1.5 mr-5 w-64 h-10  px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 text-gray-700 placeholder-gray-400" placeholder='Username' type='text'  {...register("username")}>
          </input>
          <input className="my-1.5 mr-5 w-64 h-10  px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 text-gray-700 placeholder-gray-400" placeholder='Email Adress' type='email' {...register("email")}>
          </input>
          <input className="my-1.5 mr-5 w-64 h-10  px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 text-gray-700 placeholder-gray-400" placeholder='Phone Number' type='number'
           {...register("number")}>
          </input>
          <input className="my-1.5 mr-5 w-64 h-10  px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 text-gray-700 placeholder-gray-400" placeholder='Bio' type='text'
           {...register("bio")}>
          </input>
          <input className="my-1.5 mr-5 w-64 h-10  px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 text-gray-700 placeholder-gray-400" placeholder='Password' type='password'
          {...register("password")}>
          </input>
          <input className=" mr-5 w-64 h-10  px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 text-gray-700 placeholder-gray-400" placeholder='Confirm Password' type='password'  {...register("confirm_password")}>
          </input>
          <label className="relative block cursor-pointer bg-blue-400 hover:bg-blue-600 text-white rounded-md p-2">
            <span className="text-2xl">Upload profile</span>
            <input type="file" className="hidden" accept='image/*' {...register("file")} />
          </label>
        </div>
      <button className="m-1 inline-flex items-center bg-indigo-500 text-white border-0 py-1 px-3 focus:outline-none hover:bg-indigo-200 hover:text-black rounded text-base mt-4 md:mt-0" type='submit'>
            Sign Up
            </button>
      </form>
    </div>
  )
}

export default RegisterPage