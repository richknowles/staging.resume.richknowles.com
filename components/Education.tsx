// components/Education.tsx

interface School {
  institution: string;
  degree: string;
  location: string;
  startDate: string;
  endDate: string;
}

interface EducationProps {
  schools: School[];
  skills: string[];
}

export default function Education({ schools, skills }: EducationProps) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">
        Education
      </h2>

      {schools.map((s) => (
        <div key={s.institution} className="mb-4">
          <h3 className="font-bold">{s.institution}</h3>
          <p className="italic">
            {s.degree}, {s.location}
          </p>
          <p>
            {s.startDate} – {s.endDate}
          </p>
        </div>
      ))}

      <h3 className="font-semibold mt-6">Technical Skills</h3>
      <p>{skills.join(" · ")}</p>
    </div>
  );
}
