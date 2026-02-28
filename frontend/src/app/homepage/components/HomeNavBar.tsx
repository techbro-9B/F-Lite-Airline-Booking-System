import React from 'react'


import { MaxWidthWrapper } from '@/components/MaxWidthWrapper'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
//import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components"; <-- from kind



export const HomeNavBar = () => {
    const customcolour = "1F1F27"
    return (
    <>
    
    <nav className = "sticky h-14 inset-x-o top-0 z-30 w-full border-b border-b-gray-200 bg-secondary-foreground backdrop-blur-lg transition-all">
    
    {/**using this to make it match the rest of the application.  */}
        <MaxWidthWrapper >
            <div className = "flex h-14 items-center justify-between border-b border-b-zinc-200 ">

            {/**Want the logo in the navbar as always.  */}

            <Link href = "/" className = {buttonVariants({variant:'link'})} >
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
                <Link href = {"/bookings"} className={buttonVariants({
                    variant:'ghost',
                     size:"sm", 
                     className: "mr-4"})}>
                    Book a Flight
                </Link>
                <Link className={buttonVariants({variant:'ghost', size:"sm"})} href={"/login"}>
                    Contact Us
                </Link>

                <Link className={buttonVariants({variant:'outline', size:"sm"})} href={"/signup"}>
                    <span className="text-foreground">Login</span> <ArrowRight className='h-5 w-5 text-foreground'/>
                </Link>

        
                </>


            </div>

            </div>


        </MaxWidthWrapper>

    </nav>
    </>
  )
}

