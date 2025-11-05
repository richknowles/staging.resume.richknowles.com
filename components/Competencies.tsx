interface CompetenciesProps {
  items?: string[];
  coreCompetencies?: {
    leadership: string;
    enterprise: string;
    development: string;
    technical: string;
  };
}

export default function Competencies({ items, coreCompetencies }: CompetenciesProps) {
  // If we have the structured coreCompetencies object, use it
  if (coreCompetencies) {
    return (
      <div>
        <h2 className="text-2xl font-semibold mb-4">Core Competencies</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg font-semibold text-blue-400 mb-2">Leadership & Innovation</h3>
            <p className="text-gray-300">{coreCompetencies.leadership}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-blue-400 mb-2">Enterprise Systems</h3>
            <p className="text-gray-300">{coreCompetencies.enterprise}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-blue-400 mb-2">Development & Architecture</h3>
            <p className="text-gray-300">{coreCompetencies.development}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-blue-400 mb-2">Technical Stack</h3>
            <div className="text-gray-300 text-sm">
              {coreCompetencies.technical.split('\n').map((line, idx) => (
                <p key={idx}>{line}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Fallback to old string array format
  if (items) {
    return (
      <ul className="grid grid-cols-2 gap-2">
        {items.map((c) => (
          <li key={c} className="before:content-['•'] before:text-blue-400 before:mr-2">
            {c}
          </li>
        ))}
      </ul>
    );
  }

  return null;
}
