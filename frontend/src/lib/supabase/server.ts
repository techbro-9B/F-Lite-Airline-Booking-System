/* 
This file holds the supabase object that allows for server-side operations with supabase

for more info: https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs#supabase-server-side-auth
Created by Lloyd, march 3, 2026
updated: Lloyd, march 3, 2026 
*/

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();

  // Create a server's supabase client with newly configured cookie,
  // which could be used to maintain user's session
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have proxy refreshing
            // user sessions.
          }
        },
      },
    }
  );
}

export const supabaseServerSide = createClient() // rememeber, cookies writing is handled in proxy.ts