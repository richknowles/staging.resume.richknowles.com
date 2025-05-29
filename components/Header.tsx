import { motion } from "framer-motion";

interface Profile {
  name: string;
  location: string;
  phone: string;
  email: string;
  linkedin: string;
  github: string;
  website: string;
  picture?: string;
}

export default function Header({ profile }: { profile: Profile }) {
  return (
    <header className="hero relative overflow-hidden text-center py-8">
      {/* portrait */}
      <div className="mx-auto mb-6 w-48 h-48 overflow-hidden rounded-full shadow-lg">
        <img
          src={profile.picture || "/portrait.jpg"}
          alt={profile.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* single center-out lightsaber beam */}
      <div className="lightsaber-container mx-auto mb-6">
        <div className="beam" />
      </div>

      {/* your name */}
      <motion.h1
        className="text-4xl font-bold mb-2"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {profile.name}
      </motion.h1>

      <p className="text-sm text-gray-400">
        {profile.location} · {profile.phone}
      </p>
      <p className="text-sm text-gray-400 mt-1 space-x-2">
        <a href={`mailto:${profile.email}`} className="underline">
          {profile.email}
        </a>
        <a href={profile.linkedin} target="_blank" className="underline">
          LinkedIn
        </a>
        <a href={profile.github} target="_blank" className="underline">
          GitHub
        </a>
        <a href={profile.website} target="_blank" className="underline">
          Website
        </a>
      </p>
    </header>
  );
}
