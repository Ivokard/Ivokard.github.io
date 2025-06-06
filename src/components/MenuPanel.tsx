interface MenuPanelProps {
  title: string;
}

export default function MenuPanel({ title }: MenuPanelProps) {
  const sampleData = {
    Projects: [
      "1",
      "2",
      "3",
      "Other projects",
    ],
    Media: ["Fondos de pantalla", "Logotipos"],
  };

  return (
    <div>
      <h2 className="text-3xl mb-4">{title}</h2>
      <ul className="space-y-2 text-2xl font-bold">
        {sampleData[title as keyof typeof sampleData]?.map((item, idx) => (
          <li key={idx}>{item}</li>
        )) || <p>No content</p>}
      </ul>
    </div>
  );
}
