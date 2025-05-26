import React from 'react'
import { Typewriter } from 'react-simple-typewriter'

export default function Hero() {
  return (
    <section className="hero text-center py-16">
      <img
        src="/portrait.jpg"
        alt="Rich Knowles"
        className="hero-photo w-48 h-48 mx-auto rounded-full shadow-lg mb-6"
      />

      {/* Optional typewriter intro */}
      <h1 className="text-3xl font-semibold">
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
