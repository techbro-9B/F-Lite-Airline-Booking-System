import { LoginForm } from "@/app/(auth)/components/login-form"

import Image from "next/image"
import Link from "next/link"

/* 
Login page... not yet implemented

Created by Lloyd, march 3, 2026
updated: Lloyd, march 3, 2026 
*/
export default function LoginPage() {



  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link href="/" className="flex items-center gap-2 self-center font-medium">
          
            <Image src={"/F-lite-logo-bg.svg"} 
            alt={"F-lite logo"}
            width={64}
            height={92}
            
            />
          
          
        </Link>
        <LoginForm />
      </div>
    </div>
  )
}