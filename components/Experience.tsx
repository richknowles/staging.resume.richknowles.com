import { motion } from "framer-motion";

interface Job {
  company: string;
  location: string;
  title: string;
  startDate: string;
  endDate: string;
  bullets: string[];
}

export default function Experience({ jobs }: { jobs: Job[] }) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Experience</h2>
      {jobs.map((job) => (
        <motion.div
          key={job.company + job.startDate}
          className="mb-6"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-bold">{job.title} @ {job.company}</h3>
          <p className="italic">{job.startDate} – {job.endDate}, {job.location}</p>
          <ul className="list-disc list-inside mt-2">
            {job.bullets.map((b) => <li key={b}>{b}</li>)}
          </ul>
        </motion.div>
      ))}
    </div>
  );
}
