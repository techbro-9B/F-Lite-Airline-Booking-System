"use client"

import { useRouter } from "next/navigation";
import { useEffect } from "react";

/*
If any error occurs in auth, etc, user should be rerouted to this page..

Created by Lloyd, march 3, 2026
updated: Lloyd, march 3, 2026 
 */

export default function ErrorPage() {
    const router = useRouter()
    
        useEffect(()=>{
            setTimeout(() => router.push('/'), 2000)
    
        }, []);
    return (

        <div>There seems to have been an error... redirecting in a sec.</div>
    )
}