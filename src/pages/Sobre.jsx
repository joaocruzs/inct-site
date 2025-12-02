import sobre from "../data/sobre.json";
import Section from "../components/Section";

export default function Sobre() {
  return (
    <Section title="Sobre o Instituto">
      <div className="prose">
        {sobre.paragrafos.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </Section>
  );
}
