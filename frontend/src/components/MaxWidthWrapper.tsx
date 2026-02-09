import React from 'react'
import { cn } from '@/lib/utils'
export const MaxWidthWrapper = (
    {
        className,
        children
    }:{
        className?: string
        children: React.ReactNode
    }
) => {
    /**This is for the spacing of every part of a page... handles the margins of the LHS & RHS and all that.  */
  return (
    /* Default settings of this component */
    <div className = {cn("mx-auto w-full max-w-screen-7xl px-2.5 md:px-20 ", className)}>
        {children}
    </div>
  )
}
