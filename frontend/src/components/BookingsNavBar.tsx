"use client"
/* 
The Nav bar for the rest of the application
Thie navbar need to be fixed for small screens.. some buttons don't show..<--- fix the HomeNavbar as well
Thats just decoration though, rn need functionality!

Created by Lloyd, Feb 22, 2026
updated: Lloyd, march 21, 2026 
*/

import { MaxWidthWrapper } from '@/components/MaxWidthWrapper'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import LogoutButton from '@/app/(auth)/components/Logout-Button'

export const BookingsNavBar = () => {
    
    const [validuser, setValidUser] = useState(false)

    // checking if the user exists to render somestuff like the logout button.
    let user
    useEffect(()=>{

        const fetchUser = async()=>{

            const supabase = await createClient()
            const {data:{user}} = await supabase.auth.getUser()
            return user
        }

        user = fetchUser()
    },[])
    
    if(user) setValidUser(true) // if this is the case... certain stuff will be rendered!
    
    return (
    <>
    
    <nav className = "sticky h-14 inset-x-o top-0 z-30 w-full border-b border-b-gray-200 bg-secondary-foreground backdrop-blur-lg transition-all">
    
    {/**using this to make it match the rest of the application.  */}
        <MaxWidthWrapper >
            <div className = "flex h-14 items-center justify-between border-b border-b-zinc-200 ">

            {/**Want the logo in the navbar as always.  */}

            <Link href = "/bookings" className = {buttonVariants({variant:'link'})} >
                <Image src={"/F-lite-logo-Transparent.svg"}
                alt = "F-lite Logo"
                height={108}
                width={67}
                />
            </Link>


            {/** gotta add a mobile navbar! */}

            <div className='hidden items-center space-x-4 sm:flex text-background'>
                <>
                {/**Using a fragement so that the DOM isn't extended. */}
                <Link className={buttonVariants({variant:'ghost', size:"sm"})} href={"/bookings"}>
                    View Flights
                </Link>

                <Link className={buttonVariants({variant:'outline', size:"sm"})} href={"/account"}>
                    <span className="text-foreground">My Account</span> 
                </Link>
                
                {
                    validuser? 
                    <Link className={buttonVariants({variant:'outline', size:"sm"})} href={"/login"}>
                    <span className="text-foreground">Login</span> 
                    </Link>: 
                    <LogoutButton>Logout</LogoutButton> 
                }
        
                </>


            </div>

            </div>


        </MaxWidthWrapper>

    </nav>
    </>
  )
}
