"use client"
import { useState,useEffect,ReactNode } from "react" 
import Cookie from "js-cookie"
// import { useRouter } from "next/navigation"
import {AuthContextType } from "./types"
import { redirect } from "next/dist/server/api-utils";

interface AuthCheckerProps {
  children: (props: { isAuthenticated: boolean }) => JSX.Element;
}
const AuthChecker:React.FC<AuthCheckerProps>= ({children}) => {
    
    useEffect(()=>{
        const authToken = Cookie.get('authToken')
        if (!authToken){
          console.log("Not authenticated")
        }
    },[])
    const isAuthenticated = Cookie.get('authToken')
  return (
    <>{children({ isAuthenticated })}</>
  )
}

export default AuthChecker