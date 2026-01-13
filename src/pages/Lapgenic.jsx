import Section from "../components/Section";

export default function Lapgenic() {
  return (
    <div>

      {/* ================= HERO ================= */}
      <div className="lab-hero">
        <img
          src="/imagens/labs/lapgenic.png"
          alt="LAPGENIC"
          className="lab-hero-bg"
        />

        <div className="lab-hero-content">
          <h1>EM BREVE</h1>
          <p>
            Laboratório de Pesquisa em Genética, Biologia Molecular
            e Terapias Avançadas
          </p>
        </div>
      </div>

      {/* ================= SOBRE ================= */}
      <Section title="Sobre o Laboratório">
        <p>
          O Laboratório LAPGENIC atua no desenvolvimento de pesquisas
          voltadas à genética molecular, oncologia translacional e
          terapias gênicas, integrando ensino, pesquisa e inovação.
        </p>
      </Section>

      {/* ================= LINHAS DE PESQUISA ================= */}
      <Section title="Linhas de Pesquisa">
        <ul className="lab-list">
          <li>Oncologia Translacional</li>
          <li>Terapias Gênicas e Celulares</li>
          <li>Nanomedicina aplicada ao câncer</li>
          <li>CRISPR-Cas9 e RNA interferente</li>
        </ul>
      </Section>

      {/* ================= INFRAESTRUTURA ================= */}
      <Section title="Infraestrutura">
        <div className="lab-galeria">
          <img src="/imagens/labs/lapgenic/infra1.jpg" alt="" />
          <img src="/imagens/labs/lapgenic/infra2.jpg" alt="" />
          <img src="/imagens/labs/lapgenic/infra3.jpg" alt="" />
        </div>
      </Section>

      {/* ================= EQUIPE ================= */}
      <Section title="Equipe do Laboratório">
        <p>
          O LAPGENIC é composto por pesquisadores, docentes, técnicos
          e discentes de graduação e pós-graduação.
        </p>
        {/* futuramente você pode importar membros específicos */}
      </Section>

    </div>
  );
}
