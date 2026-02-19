import { FaYoutube, FaLinkedin, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer>
      <div className="container footer-grid">

        {/* 1. Logo e Nome */}
        <div className="footer-col">
          <Link to="/">
            <img src="logo.png" className="footer-logo" />
          </Link>
          <p className="footer-slogan">
            Instituto Nacional de Ciência e Tecnologia em Oncologia Translacional e Terapias Gênicas
          </p>
        </div>

        {/* 2. Contato */}
        <div className="footer-col">
          <h3>Contato</h3>
          <p>Email: inctoncottgen@gmail.com</p>
          <p>Telefone: (86) 98100-6336</p>
          <p>UFPI — Teresina, Piauí</p>
        </div>

        {/* 3. Redes Sociais */}
        <div className="footer-col">
          <h3>Redes Sociais</h3>
          <p><a href="https://www.instagram.com/inct.oncottgen/" target="_blank"><FaInstagram /> Instagram</a></p>
          <p><a href="https://www.linkedin.com/company/inct-oncottgen/?viewAsMember=true" target="_blank"><FaLinkedin /> LinkedIn</a></p>
          <p><a href="https://www.youtube.com/@InstitutoNacionalONCOTTGEN" target="_blank"><FaYoutube /> Youtube</a></p>
        </div>

      </div>

      {/* 4. Linha inferior */}
      <div className="footer-bottom">
        <p>@ {new Date().getFullYear()} INCT OncoTTGen — Todos os direitos reservados.</p>
        <p className="footer-credit">Desenvolvido pela equipe INCT OncoTTGen</p>
      </div>
    </footer>
  );
}
