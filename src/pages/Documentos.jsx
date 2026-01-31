import documentos from "../data/documentos.json";
import Section from "../components/Section";

export default function Documentos() {
  return (
    <Section title="Documentos Oficiais">
      {/* 1. LISTA DE DOCUMENTOS OFICIAIS */}
      <div>
        {documentos.map((doc, i) => (
          <div key={i} className="documentos-card">
            <h3>{doc.titulo}</h3>
            <p>{doc.descricao}</p>

            <div className="documentos-actions">
              <a href={doc.arquivo} target="_blank" className="btn visualizar"> Visualizar </a>
              <a href={doc.arquivo} download className="btn baixar"> Baixar </a>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
