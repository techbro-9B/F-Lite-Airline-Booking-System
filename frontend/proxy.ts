/* 
This file holds the supabase object that allows for client-side operations with supabase


Created by Lloyd, march 3, 2026
updated: Lloyd, march 3, 2026 
*/


import { type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/proxy'


/* 
I think paths have to be configured here... can handle this some other time
*/
export async function proxy(request: NextRequest) {
  // update user's auth session
  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}