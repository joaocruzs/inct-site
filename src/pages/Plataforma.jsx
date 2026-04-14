import Section from "../components/general/Section";

/* PÁGINA 3 -- PLATAFORMA */

export default function Plataforma() {
  return (
    <>
      {/* 1. BANNER */}
      <div className="banner">
        <img src="imagens/banners/plataforma.png" className="banner-img" />
        <div className="banner-content">
          <h1>Plataforma de Colaboração Científica</h1>
          <p>Ambiente interativo para conectar pesquisas, ideias e dados em oncologia translacional.</p>
          <a href="https://oncottgenpesq.vercel.app/" target="_blank" className="banner-button">
            Acessar plataforma
          </a>
        </div>
      </div>

      {/* 2. COMO FUNCIONA */}
      <Section title="Como funciona">
        <div className="prose">
          <p>
            A plataforma foi desenvolvida para facilitar a organização e
            conexão de conhecimentos científicos entre pesquisadores do INCT.
          </p>
          <p>
            Os pesquisadores podem criar nós de informação que representam
            conceitos, artigos ou dados. Esses nós são conectados entre si,
            formando uma rede de conhecimento navegável.
          </p>
          <p>
            Inspirada em ferramentas como o Obsidian, ela permite criar 
            relações entre conceitos, artigos, dados e hipóteses de pesquisa.
          </p>
          <p>
            Essa estrutura permite identificar relações entre áreas distintas
            e gerar novas hipóteses científicas de forma visual e interativa.
          </p>
        </div>
      </Section>

      {/* 3. DIRETRIZES */}
      <div className="grid-6">
        <div className="card">
          <h2>Grafo de Conhecimento</h2>
          <p>Visualização das conexões entre ideias, pesquisas e dados.</p>
        </div>
        <div className="card">
          <h2>Colaboração</h2>
          <p>Ambiente compartilhado entre pesquisadores do INCT.</p>
        </div>
        <div className="card">
          <h2>Exploração de Dados</h2>
          <p>Identificação de padrões e relações entre estudos.</p>
        </div>
        <div className="card">
          <h2>Integração de Conhecimento</h2>
          <p>Conecta diferentes áreas da oncologia.</p>
        </div>
        <div className="card">
          <h2>Geração de Hipóteses</h2>
          <p>Facilita novas ideias a partir de conexões entre pesquisadores.</p>
        </div>
        <div className="card">
          <h2>Colaboração Ativa</h2>
          <p>Estimula interação entre pesquisadores.</p>
        </div>
      </div>

      {/* 4. ACESSO à PLATAFORMA */}
      <Section title="Acesso à Plataforma">
        <div className="card">
          <p> O acesso à plataforma é restrito a pesquisadores vinculados ao INCT OncoTTGen. </p>
          <p>
            Para garantir a segurança dos dados e das pesquisas, o sistema utiliza autenticação
            controlada e permissões de acesso.
          </p>
          <a href="https://oncottgenpesq.vercel.app" target="_blank" className="special-link">
            Ir para login →
          </a>
        </div>
      </Section>
    </>
  );
}

