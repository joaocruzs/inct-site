import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import {
  FaYoutube,
  FaLinkedin,
  FaInstagram,
  FaRegUserCircle,
  FaBars,
  FaTimes
} from "react-icons/fa";

export default function Header({ transparent = false }) {
  const [open, setOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(null);

  const closeAll = () => {
    setOpen(false);
    setSubmenuOpen(null);
  };

  const toggleSubmenu = (menu) => {
    setSubmenuOpen(submenuOpen === menu ? null : menu);
  };

  return (
    <header className={`header ${transparent ? "header-transparent" : ""}`}>
      <div className="container nav">

        {/* Logo */}
        <div className="logo">
          <Link to="/" onClick={closeAll}>
            <img src="logo.png" alt="Logo INCT" />
          </Link>
        </div>

        {/* Botão Mobile */}
        <div
          className={`menu-btn ${open ? "open" : ""}`}
          onClick={() => setOpen(!open)}
        >
          {open ? <FaTimes /> : <FaBars />}
        </div>

        {/* Menu */}
        <nav className={`nav-links ${open ? "open" : ""}`}>

          <NavLink to="/" onClick={closeAll}>Início</NavLink>

          {/* Instituto */}
          <div className="submenu-click">
            <span
              className="submenu-title"
              onClick={() => toggleSubmenu("instituto")}
            >
              Instituto
            </span>

            <div className={`submenu-box ${submenuOpen === "instituto" ? "open" : ""}`}>
              <NavLink to="/sobre" onClick={closeAll}>Sobre</NavLink>
              <NavLink to="/documentos" onClick={closeAll}>Documentos</NavLink>
              <NavLink to="/plataforma" onClick={closeAll}>Plataforma</NavLink>
            </div>
          </div>

          {/* Publicações */}
          <div className="submenu-click">
            <span
              className="submenu-title"
              onClick={() => toggleSubmenu("publicacoes")}
            >
              Publicações
            </span>

            <div className={`submenu-box ${submenuOpen === "publicacoes" ? "open" : ""}`}>
              <NavLink to="/noticias" onClick={closeAll}>Notícias</NavLink>
              <NavLink to="/publicacoes" onClick={closeAll}>Publicações Acadêmicas</NavLink>
              <NavLink to="/eventos" onClick={closeAll}>Eventos</NavLink>
            </div>
          </div>

          {/* Equipe */}
          <div className="submenu-click">
            <span
              className="submenu-title"
              onClick={() => toggleSubmenu("equipe")}
            >
              Equipe
            </span>

            <div className={`submenu-box ${submenuOpen === "equipe" ? "open" : ""}`}>
              <NavLink to="/comite" onClick={closeAll}>Comitê Gestor</NavLink>
              <NavLink to="/pesquisadores" onClick={closeAll}>Pesquisadores</NavLink>
              <NavLink to="/parceiros" onClick={closeAll}>Parceiros</NavLink>
            </div>
          </div>

          <NavLink to="/lapgenic" onClick={closeAll}>Lapgenic</NavLink>

          <div className="social-links">
            <a href="https://www.youtube.com/@InstitutoNacionalONCOTTGEN" target="_blank" rel="noopener noreferrer">
              <FaYoutube />
            </a>

            <a href="https://www.linkedin.com/company/inct-oncottgen/?viewAsMember=true" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </a>

            <a href="https://www.instagram.com/inct.oncottgen/" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>

            <NavLink to="/admin/login" onClick={closeAll}>
              <FaRegUserCircle />
            </NavLink>
          </div>

        </nav>
      </div>
    </header>
  );
}
