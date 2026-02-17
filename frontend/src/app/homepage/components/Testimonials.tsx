import { MaxWidthWrapper } from '@/components/MaxWidthWrapper'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'







const testimonials = [

    {
        id: "1",
        name: "Jeff Bezos",
        rating: 5,
        review: "Better than Amazon!"

    },
    {
        id: "2",
        name: "Elon Musk",
        rating: 5,
        review: "This Airline is going to be the defacto method of travel to mars some day!"

    },
     {
        id: "3",
        name: "Barack Obama",
        rating: 4,
        review: "This Airline enabled me to campaign seamlessly!"

    },
]
const Testimonials = () => {
  return (
        <section className="py-12">
      <MaxWidthWrapper>
        <h2 className="text-3xl font-bold">Testimonials</h2>
        <p className="mt-2 text-muted-foreground">
          What people are saying about F-lite.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <Card key={t.id} className="h-full">
              <CardHeader>
                <CardTitle className="text-lg">{t.name}</CardTitle>

                {/* simple “stars” without extra components */}
                <CardDescription className="text-sm">
                  {"★".repeat(t.rating)}
                  <span className="text-muted-foreground">
                    {" "}
                    ({t.rating}/5)
                  </span>
                </CardDescription>
              </CardHeader>

              <CardContent>
                <p className="text-sm leading-6 text-muted-foreground">
                  {t.review}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </MaxWidthWrapper>
    </section>
  )
}

export default Testimonials