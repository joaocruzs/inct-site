import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { FaYoutube, FaLinkedin, FaInstagram } from "react-icons/fa";

export default function Header({ transparent = false }) {
  const [open, setOpen] = useState(false);           
  const [submenuOpen, setSubmenuOpen] = useState(false); 

  const closeAll = () => {
    setOpen(false);
    setSubmenuOpen(false);
  };

  return (
    <header className={`header ${transparent ? "header-transparent" : ""}`}>
      <div className="container nav">

        {/* LOGO */}
        <div className="logo">
          <Link to="/" onClick={closeAll}>
            <img src="banners/logo.png" alt="Logo INCT" />
          </Link>
        </div>

        {/* BOTÃO MOBILE */}
        <div
          className="menu-btn"
          onClick={() => {
            setOpen(!open);
            setSubmenuOpen(false);
          }}
        >
          {open ? "✕" : "☰"}
        </div>

        {/* MENU PRINCIPAL */}
        <nav className={`nav-links ${open ? "open" : ""}`}>

          <NavLink to="/" onClick={closeAll}>Início</NavLink>

          {/* SUBMENU */}
          <div className="submenu-click">

            <span
              className="submenu-title"
              onClick={() => setSubmenuOpen(!submenuOpen)}
            >
              Instituto ⁝
            </span>

            {/* SUBMENU SEMPRE RENDERIZADO */}
            <div
              className="submenu-box"
              style={{
                display:
                  window.innerWidth <= 820
                    ? submenuOpen
                      ? "flex"
                      : "none"
                    : ""
              }}
            >
              <NavLink to="/sobre" onClick={closeAll}>Sobre</NavLink>
              <NavLink to="/documentos" onClick={closeAll}>Documentos</NavLink>
              <NavLink to="/lapgenic" onClick={closeAll}>Lapgenic</NavLink>
            </div>
          </div>

          {/* SUBMENU */}
          <div className="submenu-click">

            <span
              className="submenu-title"
              onClick={() => setSubmenuOpen(!submenuOpen)}
            >
              Equipe ⁝
            </span>
            
            {/* SUBMENU SEMPRE RENDERIZADO */}
            <div
              className="submenu-box"
              style={{
                display:
                  window.innerWidth <= 820
                    ? submenuOpen
                      ? "flex"
                      : "none"
                    : ""
              }}
            >
              <NavLink to="/comite" onClick={closeAll}>Comitê Gestor</NavLink>
              <NavLink to="/pesquisadores" onClick={closeAll}>Pesquisadores</NavLink>
              <NavLink to="/parceiros" onClick={closeAll}>Parceiros</NavLink>
            </div>
          </div>

          <NavLink to="/publicacoes" onClick={closeAll}>Pesquisa</NavLink>
          <NavLink to="/noticias" onClick={closeAll}>Notícias</NavLink>
          <NavLink to="/contato" onClick={closeAll}>Contato</NavLink>
        
          <div className="social-links">
            <a
              href="https://www.youtube.com/@InstitutoNacionalONCOTTGEN"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
            >
              <FaYoutube />
            </a>

            <a
              href="https://www.linkedin.com/company/inct-oncottgen/?viewAsMember=true"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>

            <a
              href="https://www.instagram.com/inct.oncottgen/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
