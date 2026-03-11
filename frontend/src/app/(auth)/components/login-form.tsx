"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { login } from "../actions"
import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"



/* 
the login form 

Created by Lloyd, march 2, 2026
updated: Lloyd, march 2, 2026 
*/
export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
      console.log("Rendered the login form")
      const router = useRouter()
      const supabase = createClient()
      const [userpassword, setUserPassword] = useState("")
      const [useremail, setUserEmail] = useState("")
      const [errormessage, setErrorMessage] = useState<string|null>(null)
      
    


      const handleSubmit = async (e: any) => {
        e.preventDefault()
        setErrorMessage(null)

        const {data, error} = await supabase.auth.signInWithPassword({
          email: useremail,
          password: userpassword,
        })

        if (error) {
          setErrorMessage(error.message)
          console.log(errormessage)
          return
        }

        console.log("Login successful:", data)
        router.push("/account")
      }
            
  
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>
            OAuth Coming soon
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e)=>handleSubmit(e)}>
            <FieldGroup>
              <Field>
              {/* Don't need login with apple, google, etc yet! */}
              </Field>
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
               Continue with
              </FieldSeparator>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  onChange={(e)=>setUserEmail(e.target.value)}
                  type="email"
                  placeholder="jepemstein@example.com"
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" onChange={(e)=>setUserPassword(e.target.value)} required />
              </Field>
              {errormessage && (
                  <Field>
                    <FieldDescription className="text-destructive">
                      {errormessage}
                    </FieldDescription>
                  </Field>
                )}
              <Field>
                <Button type="submit">Login</Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <Link href="/signup">Sign up</Link>
                </FieldDescription>
              </Field>
              
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  )
}
