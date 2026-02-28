"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
//import { supabase } from "@/lib/supabase/supabaseClient"; for laterrr!!

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const router = useRouter();
  // const supabase = supabaseBrowserClient(); // don't need this

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  /* const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // makes sure the page doesn't reload!!
    setErrorMessage(null);

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      
      email,
      password,
      options: {
        // Adjust to your actual callback route
        //emailRedirectTo: `${window.location.origin}/auth/callback`,
        data: {
          full_name: name,
        },
      },
    });

    setLoading(false);

    if (error) {
      setErrorMessage(error.message);
      return;
    } */

    // If you require email confirmation:⚠️----> add this late
    //router.push("/auth/check-email");
    // Or, if email confirmation is off, you can send them straight to dashboard:
    //router.push("/dashboard");
    //console.log({data}) <<---- using this to double check

    
  //};




  return (
    <Card {...props} >
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input
                id="name"
                type="text"
                placeholder="Lloydinho Prime"
                value={"test"}
                /* onChange={(e) => setName(e.target.value)} */
                required
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="lloydinho@example.com"
                value={"testemail@flite.ca"}
                /* onChange={(e) => setEmail(e.target.value)} */
                required
              />
              <FieldDescription>
                We&apos;ll use this to contact you. We will not share your email
                with anyone else.
              </FieldDescription>
            </Field>

            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                type="password"
                value={"password1234"}
                /* onChange={(e) => setPassword(e.target.value)} */
                required
              />
              <FieldDescription>
                Must be at least 8 characters long.
              </FieldDescription>
            </Field>

            <Field>
              <FieldLabel htmlFor="confirm-password">
                Confirm Password
              </FieldLabel>
              <Input
                id="confirm-password"
                type="password"
                value={"confirmPassword123"}
                /* onChange={(e) => setConfirmPassword(e.target.value)} */
                required
              />
              <FieldDescription>Please confirm your password.</FieldDescription>
            </Field>

            {errorMessage && (
              <Field>
                <FieldDescription className="text-destructive">
                  {errorMessage}
                </FieldDescription>
              </Field>
            )}

            <FieldGroup>
              <Field>
                <Button type="submit" disabled={loading} className="mr-2">
                  {loading ? "Creating..." : "Create Account"}
                
                </Button>

                {/* Placeholder for OAuth – needs separate Supabase provider setup */}
                <Button variant="outline" type="button">
                  Sign up with Google
                </Button>

                <FieldDescription className="px-6 text-center">
                  Already have an account? <a href="/login">Sign in</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
