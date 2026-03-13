import { FaEnvelope, FaPhoneAlt, FaMapPin } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer-informativo">
      <div className="container footer-grid">
        
        <div className="footer-col">
          <h3>Navegação</h3>
          <Link to="/">Página Inicial</Link>
          <Link to="/sobre">Sobre Nós</Link>
          <Link to="/pesquisadores">Pesquisadores</Link>
          <Link to="/publicacoes">Publicações</Link>
          <Link to="/noticias">Notícias</Link>
          <Link to="/eventos">Eventos</Link>
        </div>

        <div className="footer-col">
          <h3>Recursos</h3>
          <Link to="/comite">Comitê Gestor</Link>
          <Link to="/documentos">Documentos</Link>
          <Link to="/parceiros">Parceiros</Link>
          <Link to="/plataforma">Plataforma</Link>
          <a href="#" target="_blank">Relatório Anual</a>
        </div>

        <div className="footer-col">
          <h3>Contato</h3>
          <p><FaEnvelope /><a href="mailto:inctoncottgen@gmail.com">inctoncottgen@gmail.com</a></p>
          <p><FaPhoneAlt /> (86) 98100-6336</p>
          <p><FaMapPin /><a href="https://maps.app.goo.gl/iRuB6Ln3bWnymFjg7">UFPI — Teresina, PI</a></p>
          
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

      <div className="footer-bottom">
        <div className="container">
          <p>© {new Date().getFullYear()} INCT OncoTTGen</p>
          <p>Desenvolvido com 💙 pela equipe INCT</p>
        </div>
      </div>
    </footer>
  );
}
