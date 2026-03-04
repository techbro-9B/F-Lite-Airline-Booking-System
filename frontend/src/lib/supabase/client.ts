/* 
 This is where the clientSide supabase object will be stored.

Created by Lloyd, march 2, 2026
updated: Lloyd, march 2, 2026 

*/

import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  // Create a supabase client on the browser with project's credentials
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  );
}

export const supabaseClientSide = createClient() // can import this object anywhere int client components