/* 
just the signup page... the logic is handled in the sighup form, which is a client component
*/

import { SignupForm } from "@/app/(auth)/components/signup-form"
import Image from "next/image"
import Link from "next/link"
export default function SignupPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        
        <Link href="/" className="flex items-center gap-2 self-center font-medium">
          
            <Image src={"/F-lite-logo-bg.svg"} 
            alt={"F-lite logo"}
            width={64}
            height={92}
            
            />
          </Link>
            
        <SignupForm />
      </div>
    </div>
  )
}
