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

        {/* 1. Logo */}
        <div className="logo">
          <Link to="/" onClick={closeAll}>
            <img src="banners/logo.png" alt="Logo INCT" />
          </Link>
        </div>

        {/* 2. Botão Mobile */}
        <div
          className="menu-btn"
          onClick={() => {
            setOpen(!open);
            setSubmenuOpen(false);
          }}
        >
          {open ? "✕" : "☰"}
        </div>

        {/* 3. Menu Principal */}
        <nav className={`nav-links ${open ? "open" : ""}`}>

          <NavLink to="/" onClick={closeAll}>Início</NavLink>

          {/* 4.1. Submenu Instituto */}
          <div className="submenu-click">

            <span
              className="submenu-title"
              onClick={() => setSubmenuOpen(!submenuOpen)}
            >
              Instituto ⁝
            </span>

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
              <NavLink to="/plataforma" onClick={closeAll}>Plataforma</NavLink>
            </div>
          </div>

          {/* 4.2. Submenu Publicações */}
          <div className="submenu-click">

            <span
              className="submenu-title"
              onClick={() => setSubmenuOpen(!submenuOpen)}
            >
              Publicações ⁝
            </span>

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
            <NavLink to="/noticias" onClick={closeAll}>Notícias</NavLink>
            <NavLink to="/publicacoes" onClick={closeAll}>Publicações Acadêmicas</NavLink>
            <NavLink to="/eventos" onClick={closeAll}>Eventos</NavLink>
            </div>
          </div>

          {/* 4.3. Submenu Equipe */}
          <div className="submenu-click">

            <span
              className="submenu-title"
              onClick={() => setSubmenuOpen(!submenuOpen)}
            >
              Equipe ⁝
            </span>
            
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

          <NavLink to="/lapgenic" onClick={closeAll}>Lapgenic</NavLink>

          <div className="social-links">
            <a
              href="https://www.youtube.com/@InstitutoNacionalONCOTTGEN"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
            > <FaYoutube /> </a>

            <a
              href="https://www.linkedin.com/company/inct-oncottgen/?viewAsMember=true"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            > <FaLinkedin /> </a>

            <a
              href="https://www.instagram.com/inct.oncottgen/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            > <FaInstagram /> </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
