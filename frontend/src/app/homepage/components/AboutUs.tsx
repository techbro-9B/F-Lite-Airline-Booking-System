import { MaxWidthWrapper } from '@/components/MaxWidthWrapper'
import { Card, CardDescription, CardTitle } from '@/components/ui/card'
import React from 'react'
import Image from 'next/image'
const AboutUs = () => {
  return (
  <section className="mt-30 sm:mt-50 sm:mb-30">
    <MaxWidthWrapper className="mx-auto w-full max-w-6xl">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        {/* Left: text */}
        <div className="max-w-2xl">
          <h1 className="max-w-4xl text-4xl font-bold md:text-4xl lg:text-4xl">
            About Us
          </h1>

          {/* Use <p> instead of <text> */}
          <p className="mt-6 text-base leading-7 text-muted-foreground">
            We are F-lite, your go-to premium aviation company revolutionizing the
            Canadian flying experience. Our mission is simple: deliver fast,
            reliable, and intuitive flight booking for travelers while empowering
            airline staff with powerful management tools.
          </p>

          <p className="mt-4 text-base leading-7 text-muted-foreground">
            From seamless flight discovery and destination guides to real-time
            analytics and automated communications, F-lite connects customers with
            their journeys and administrators with operational excellence. We're
            building the future of air travel—one flight at a time.
          </p>

          <p className="mt-4 text-base leading-7 text-muted-foreground">
            Experience seamless aviation elevated with F-lite.
          </p>
        </div>

        {/* Right: image */}
        <div className="flex justify-center lg:justify-end">
          <Image
            src="/imageofbookingcard.png"
            alt="Example booking card"
            width={420}
            height={420}
            className="h-auto w-full max-w-md rounded-xl border shadow-sm"
            priority
          />
        </div>
      </div>
    </MaxWidthWrapper>
  </section>

  )
}

export default AboutUs