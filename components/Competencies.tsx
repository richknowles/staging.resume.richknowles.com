export default function Competencies({ items }: { items: string[] }) {
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
