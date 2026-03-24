/* 
This file holds the supabase function that allows for client-side operations with supabase

for more info: https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs#supabase-server-side-auth
Created by Lloyd, march 3, 2026
updated: Lloyd, march 3, 2026 
*/

import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  // Create a supabase client on the browser with project's credentials
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  );
}

