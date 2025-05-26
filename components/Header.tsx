import { motion } from "framer-motion";

interface Profile {
  name: string;
  location: string;
  phone: string;
  email: string;
  linkedin: string;
  github: string;
  website: string;
  /** Optional custom portrait URL; falls back to /portrait.jpg */
  picture?: string;
}

export default function Header({ profile }: { profile: Profile }) {
  return (
    <header className="hero relative overflow-hidden text-center py-8">
      <img
        src={profile.picture || "/portrait.jpg"}
        alt={profile.name}
        className="hero-photo w-48 h-48 mx-auto rounded-full shadow-lg mb-6"
      />

      <motion.h1
        className="text-4xl font-bold"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {profile.name}
      </motion.h1>

      <p className="mt-2">
        {profile.location} · {profile.phone}
      </p>

      <p className="mt-1">
        <a href={`mailto:${profile.email}`} className="underline">
          {profile.email}
        </a>{" "}
        ·{" "}
        <a href={profile.linkedin} target="_blank" className="underline">
          LinkedIn
        </a>{" "}
        ·{" "}
        <a href={profile.github} target="_blank" className="underline">
          GitHub
        </a>{" "}
        ·{" "}
        <a href={profile.website} target="_blank" className="underline">
          Website
        </a>
      </p>
    </header>
  );
}
