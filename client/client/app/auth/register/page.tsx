"use client"
import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState ,FormEvent} from 'react'
 
const RegisterPage = () => {
  const router = useRouter();

  const [name,setName] = useState("")
  const [username,setUsername] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [confirm_password,setConfirm_password] = useState("")
  const [bio,setBio] = useState("")
  const [number,setNumber] = useState("")

  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const handleSubmit= async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData();
    if (file) {
      formData.append('profile_image_url', file);
    }
    formData.append("name", name);
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("confirm_password", confirm_password);
    formData.append("bio", bio);
    formData.append("number", number);

    await axios.post('http://localhost:8000/api/auth/register/',formData,{
      headers:{
        "Content-Type": "multipart/form-data",
      }
    }) .then((response) => {
      // handle the response
          console.log(response);
          router.push('/auth/login')
        })
        .catch((error) => {
          // handle errors
          console.log(error);
        });
  }

  return (
    <div className='flex justify-center items-center h-screen '>
      <div className="img">
        <Image src='/login.jpg' alt='login.png' width={500}
          height={300}
          priority />
      </div>
      <form className="form  h-auto" onSubmit={handleSubmit}>
        <h1 className="p-4 text-2xl">Sign Up</h1>
        <div className="grid grid-rows-4 grid-flow-col gap-4">
          <input className="my-1.5 mr-5 w-64 h-10  px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 text-gray-700 placeholder-gray-400" placeholder='Full Name' type='text' name='name' value={name} onChange={(e)=>setName(e.target.value)}>
          </input>
          <input className="my-1.5 mr-5 w-64 h-10  px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 text-gray-700 placeholder-gray-400" placeholder='Username' type='text' name='username' value={username} onChange={(e)=>setUsername(e.target.value)}>
          </input>
          <input className="my-1.5 mr-5 w-64 h-10  px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 text-gray-700 placeholder-gray-400" placeholder='Email Adress' type='email' name='email' value={email} onChange={(e)=>setEmail(e.target.value)}>
          </input>
          <input className="my-1.5 mr-5 w-64 h-10  px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 text-gray-700 placeholder-gray-400" placeholder='Phone Number' type='number'
           name='number' value={number} onChange={(e)=>setNumber(e.target.value)}>
          </input>
          <input className="my-1.5 mr-5 w-64 h-10  px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 text-gray-700 placeholder-gray-400" placeholder='Bio' type='text'
           name='bio' value={bio} onChange={(e)=>setBio(e.target.value)}>
          </input>
          <input className="my-1.5 mr-5 w-64 h-10  px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 text-gray-700 placeholder-gray-400" placeholder='Password' type='password'
          name='password' value={password} onChange={(e)=>setPassword(e.target.value)}>
          </input>
          <input className=" mr-5 w-64 h-10  px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 text-gray-700 placeholder-gray-400" placeholder='Confirm Password' type='password'name='confirm_password' value={confirm_password} onChange={(e)=>setConfirm_password(e.target.value)}>
          </input>
          <label className="relative block cursor-pointer bg-blue-400 hover:bg-blue-600 text-white rounded-md p-2">
            <span className="text-2xl">Upload profile</span>
            <input type="file" id="fileInput" className="hidden" onChange={handleFileChange}/>
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