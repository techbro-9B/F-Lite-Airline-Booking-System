"use client" // since the user is interacting and there are events
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
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Link from "next/link"

/* 
The signup forms. 
handles the events of creating an account. supabase is imported from client.ts since this is a client components

Created by Lloyd, march 3, 2026
updated: Lloyd, march 3, 2026 
*/


export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  console.log("Signup Form Rendered!")
  const router = useRouter()

  // creating states/ variables that'll change
  const [password, setPassword] = useState("")
  const [confirmpassword, setConfirmPassword] = useState("")
  const [username, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null);


  //a function that handles submittion of the form. 
  const handleSubmit = async (e:any) =>{
    
    e.preventDefault() // stop the page from refresshing
    setErrorMessage(null)
    if(password != confirmpassword){
      setErrorMessage("Passwords do not match.")
    }

    setLoading(true)
    // the logic that creates the user in supabase
    const {data, error} = await createClient().auth.signUp({
      email,
      password,
      options: {
        // i think a callback route can be adjusted
        data:{
          full_name: username
        }
      }

    })
      
    setLoading(false)
    if(error){
      console.error("There is an error with creating user: ", error.message)

    }else{
      console.log("User has been created successfully!") // for debugging... can remove when in production 
    }
    router.push("/bookings")

  } 






  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create your account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e)=>handleSubmit(e)}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">UserName</FieldLabel>
                <Input id="name" type="text" placeholder="JeffEpdeem" onChange={(event)=>{setUserName(event.target.value)}} required />
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="jepdeem@example.com"
                  onChange={(event)=>{setEmail(event.target.value)}}
                  required
                />
              </Field>
              <Field>
                <Field className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input id="password" type="password" onChange={(event)=>{setPassword(event.target.value)}} required />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="confirm-password">
                      Confirm Password
                    </FieldLabel>
                    <Input id="confirm-password" type="password" onChange={(event)=>{setConfirmPassword(event.target.value)}} required />
                  </Field>
                </Field>
                <FieldDescription>
                  Must be at least 8 characters long.
                </FieldDescription>
                {errorMessage && (
                  <Field>
                    <FieldDescription className="text-destructive">
                      {errorMessage}
                    </FieldDescription>
                  </Field>
                )}
                
              </Field>
              <Field>
                <Button type="submit">Create Account</Button>
                <FieldDescription className="text-center">
                  Already have an account? <Link href="/login">login</Link>
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
