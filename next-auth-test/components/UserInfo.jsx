"use client";


import { signOut } from "next-auth/react"
import MapComponent from "./map"



export default function UserInfo(){
    return(
        <MapComponent/>
    )
}