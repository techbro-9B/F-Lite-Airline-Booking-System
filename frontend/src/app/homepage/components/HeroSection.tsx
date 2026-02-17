import { MaxWidthWrapper } from '@/components/MaxWidthWrapper'
import React from 'react'
import Image from 'next/image'
const HeroSection = () => {
  return (
    <MaxWidthWrapper className="mt-5 sm:mt-5 sm:mb-30 mb-30 flex flex-col items-center justify-center text-center ">
      <div className = "relative isolate">
        {/**the company logo... front & center*/}
        <div className = "rounded-xl lg:p-4 ">
          {/* Using a default image for now!*/}
            <Image src={"/F-lite-inverse.png"} alt={"Company image"} 
                  height={512}
                  width={768}
                  /> 
          </div>   
          <h1 className = "mx-w-4xl text-4xl font-bold md:text-5xl lg:text-6xl ">
          A new way to <span className = "text-primary">travel</span>
        </h1>

                 
        </div>

        {/* little txt bout whateva */}
        
    </MaxWidthWrapper>
  )
}

export default HeroSection