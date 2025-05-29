import React from 'react'
import { Typewriter } from 'react-simple-typewriter'

export default function Hero() {
  return (
    <section className="hero text-center py-16">
      {/* fixed-size circle container */}
      <div className="mx-auto mb-6 w-48 h-48 overflow-hidden rounded-full shadow-lg">
        {/* img fills that circle, cropping any extra so it never squashes */}
        <img
          src="/portrait.jpg"
          alt="Rich Knowles"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Optional typewriter intro */}
      <h1 className="text-3xl font-semibold fade-up">
        <Typewriter
          words={[
            'Hi, I’m Rich.',
            'I architect domain infrastructure.',
            'Let’s connect!'
          ]}
          loop={false}
          cursor
          cursorStyle="|"
          typeSpeed={80}
          deleteSpeed={40}
          delaySpeed={1500}
        />
      </h1>
    </section>
  )
}
