import { motion } from "framer-motion";

interface Profile {
  name: string;
  location: string;
  phone: string;
  email: string;
  linkedin: string;
  github: string;
  website: string;
}

export default function Header({ profile }: { profile: Profile }) {
  return (
    <header className="text-center py-8">
      <motion.h1
        className="text-4xl font-bold"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {profile.name}
      </motion.h1>
      <p className="mt-2">{profile.location} · {profile.phone}</p>
      <p className="mt-1">
        <a href={`mailto:${profile.email}`} className="underline">{profile.email}</a> ·{" "}
        <a href={profile.linkedin} target="_blank" className="underline">LinkedIn</a> ·{" "}
        <a href={profile.github} target="_blank" className="underline">GitHub</a>
      </p>
    </header>
  );
}
