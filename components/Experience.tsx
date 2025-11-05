import { motion } from "framer-motion";

interface JobSection {
  title: string;
  bullets: string[];
}

type JobSections = Record<string, JobSection>;

interface Job {
  company: string;
  location: string;
  title: string;
  startDate: string;
  endDate: string;
  description?: string;
  bullets?: string[];
  sections?: JobSections;
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

          {job.description && <p className="mt-2 text-gray-300">{job.description}</p>}

          {/* Handle flat bullets structure */}
          {job.bullets && (
            <ul className="list-disc list-inside mt-2">
              {job.bullets.map((b, idx) => <li key={idx}>{b}</li>)}
            </ul>
          )}

          {/* Handle nested sections structure */}
          {job.sections && Object.entries(job.sections).map(([key, section]) => (
            <div key={key} className="mt-4">
              <h4 className="text-lg font-semibold text-blue-400">{section.title}</h4>
              <ul className="list-disc list-inside mt-2">
                {section.bullets.map((b, idx) => <li key={idx}>{b}</li>)}
              </ul>
            </div>
          ))}
        </motion.div>
      ))}
    </div>
  );
}
