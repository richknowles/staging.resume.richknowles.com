"use client";

import resume from "../data/resume.json";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Summary from "../components/Summary";
import Competencies from "../components/Competencies";
import Experience from "../components/Experience";
import Education from "../components/Education";
import Footer from "../components/Footer";
import PDFGenerator from "../components/PDFGenerator";

export default function Page() {
  const {
    profile,
    summary,
    coreCompetencies,
    experience,
    education,
    technicalSkills,
  } = resume;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4">
      {/* The rest of your page */}
      <div id="resume-content">
        {/* Hero section with portrait + single beam + name */}
        <motion.div
          className="hero relative overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Header profile={profile} />
        </motion.div>

        <motion.section
          className="py-8 max-w-3xl mx-auto"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
        >
          <Summary text={summary} />
        </motion.section>
        <motion.section
          className="py-8 max-w-3xl mx-auto"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
        >
          <Competencies items={coreCompetencies} />
        </motion.section>
        <motion.section
          className="py-8 max-w-3xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          <Experience jobs={experience} />
        </motion.section>
        <motion.section
          className="py-8 max-w-3xl mx-auto"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
        >
          <Education schools={education} skills={technicalSkills} />
        </motion.section>
      </div>

      <Footer />
      <PDFGenerator />
    </div>
  );
}
