"use client"
import Navbar from '@/components/Navbar'
import Image from 'next/image'
import { useEffect } from 'react'
import Cookies from 'js-cookie';

export default function Home() {
  useEffect(() =>{
    const authToken = Cookies.get('authToken');
  },[])
  return (
    <main className=''>
      <h2>Home Page</h2>
    </main>
  )
}
