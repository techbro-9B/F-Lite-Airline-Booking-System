"use client"

/* 
Logout button that's component, can be used anywhere

Created by Lloyd, march 11, 2026
updated: Lloyd, march 11, 2026 
*/
import React from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
interface LogoutButtonProps{
    className?: string // this is optional!!
    children: React.ReactNode // this'll be wrapped around something
}



const LogoutButton = ({className, children}:LogoutButtonProps) => {

    const router = useRouter()

    const handleLogout = async()=>{ 
        //e.preventDefault() /// don't need this.... isn't a form

        const supabase = await createClient()
        await supabase.auth.signOut()
        router.push("/logout")
    
    }
  return (
    <Button className={cn(className)} onClick={handleLogout}>
        {children}
    </Button>
  )
}

export default LogoutButton