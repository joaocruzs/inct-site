import { FaEnvelope, FaPhoneAlt, FaMapPin, FaCopy } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Footer() {
  const [copiado, setCopiado] = useState("");

  function copiarTexto(texto, tipo) {
    navigator.clipboard.writeText(texto).then(() => {
      setCopiado(tipo);
      setTimeout(() => setCopiado(""), 2000);
    });
  }

  return (
    <footer className="footer-informativo">
      <div className="container footer-grid">
        {/* 1. NAVEGAÇÃO */}
        <div className="footer-col">
          <h3>Navegação</h3>
          <Link to="/">Página Inicial</Link>
          <Link to="/sobre">Sobre Nós</Link>
          <Link to="/pesquisadores">Pesquisadores</Link>
          <Link to="/publicacoes">Publicações</Link>
          <Link to="/noticias">Notícias</Link>
          <Link to="/eventos">Eventos</Link>
        </div>

        {/* 2. RECURSOS */}
        <div className="footer-col">
          <h3>Recursos</h3>
          <Link to="/comite">Comitê Gestor</Link>
          <Link to="/documentos">Documentos</Link>
          <Link to="/parceiros">Parceiros</Link>
          <Link to="/plataforma">Plataforma</Link>
          <Link to="/relatorios">Relatórios</Link>
          <Link to="/contato">Contate-nos</Link>
        </div>

        {/* 3. CONTATO */}
        <div className="footer-col">
          <h3>Contato</h3>

          <div
            className="copy-item"
            onClick={() => copiarTexto("inctoncottgen@gmail.com", "email")}
          >
            <FaEnvelope />
            <span>inctoncottgen@gmail.com</span>
            <div className="copy-action">
              {copiado === "email" ? "Copiado!" : <><FaCopy /> Copiar</>}
            </div>
          </div>

          <div
            className="copy-item"
            onClick={() => copiarTexto("(86) 98100-6336", "telefone")}
          >
            <FaPhoneAlt />
            <span>(86) 98100-6336</span>
            <div className="copy-action">
              {copiado === "telefone" ? "Copiado!" : <><FaCopy /> Copiar</>}
            </div>
          </div>

          <p>
            <FaMapPin />
            <a href="https://maps.app.goo.gl/iRuB6Ln3bWnymFjg7" target="_blank">
              UFPI — Teresina, PI
            </a>
          </p>

          <div className="footer-apoio">
            <Link to="/apoio"><strong>Apoio:</strong></Link>
            <span>
              <a href="https://www.gov.br/cnpq/pt-br" target="_blank">CNPq</a> • 
              <a href="https://www.fapepi.pi.gov.br/" target="_blank"> FAPEPI</a> • 
              <a href="https://www.gov.br/capes/pt-br" target="_blank"> CAPES</a>
            </span>
          </div>
        </div>

      </div>

      {/* 4. RODAPÉ INFERIOR */}
      <div className="footer-bottom">
        <div className="container">
          <p>© {new Date().getFullYear()} INCT OncoTTGen</p>
          <p>Desenvolvido com 💙 pela equipe INCT</p>
        </div>
      </div>
    </footer>
  );
}