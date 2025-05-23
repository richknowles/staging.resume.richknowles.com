export default function Education({
  schools,
  certs,
  skills
}: {
  schools: any[];
  certs: any[];
  skills: string[];
}) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Education & Certifications</h2>
      {schools.map((s) => (
        <div key={s.institution} className="mb-4">
          <h3 className="font-bold">{s.institution}</h3>
          <p className="italic">{s.degree}, {s.location}</p>
          <p>{s.startDate} – {s.endDate}</p>
        </div>
      ))}
      <h3 className="font-semibold mt-6">Certifications</h3>
      <ul className="list-disc list-inside">
        {certs.map((c) => (
          <li key={c.name}>{c.name} – {c.date} {c.status}</li>
        ))}
      </ul>
      <h3 className="font-semibold mt-6">Technical Skills</h3>
      <p>{skills.join(" · ")}</p>
    </div>
  );
}
