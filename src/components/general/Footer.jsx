import { FaEnvelope, FaPhoneAlt, FaMapPin } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer-informativo">
      <div className="container footer-grid">
        
        <div className="footer-col">
          <h3>Navegação</h3>
          <Link to="/sobre">Sobre Nós</Link>
          <Link to="/pesquisadores">Pesquisadores</Link>
          <Link to="/publicacoes">Publicações</Link>
          <Link to="/noticias">Notícias</Link>
          <Link to="/eventos">Eventos</Link>
        </div>

        <div className="footer-col">
          <h3>Recursos</h3>
          <Link to="/documentos">Documentos</Link>
          <Link to="/parceiros">Parceiros</Link>
          <Link to="/plataforma">Plataforma</Link>
          <Link to="/comite">Comitê Gestor</Link>
          <a href="#" target="_blank">Relatório Anual</a>
        </div>

        <div className="footer-col">
          <h3>Contato</h3>
          <p><FaEnvelope /> inctoncottgen@gmail.com</p>
          <p><FaPhoneAlt /> (86) 98100-6336</p>
          <p><FaMapPin /> UFPI — Teresina, PI</p>
          
          <div className="footer-apoio">
            <strong>Apoio:</strong>
            <span>CNPq • FAPEPI • CAPES</span>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>© {new Date().getFullYear()} INCT OncoTTGen</p>
          <p>Desenvolvido com 💙 pela equipe INCT</p>
        </div>
      </div>
    </footer>
  );
}
