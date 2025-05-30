// components/Hero.jsx
export default function Hero() {
  return (
    <section className="hero text-center py-16">
      <img
        src="/portrait.jpg"
        alt="Rich Knowles"
        className="hero-photo w-48 h-48 mx-auto rounded-full shadow-lg mb-6"
      />

      <div className="lightsaber-container">
        <div className="beam" />
      </div>

      <h1 className="text-3xl font-semibold">Rich Knowles</h1>
      {/* … */}
    </section>
  );
}
