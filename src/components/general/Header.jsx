import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaYoutube,
  FaInstagram,
  FaLinkedin,
  FaUserFriends
} from "react-icons/fa";
import { FiUser } from "react-icons/fi";

export default function Header() {
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
    <header>
      <div className="container nav">

        {/* 1. Logo */}
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

        {/* 2. Menu */}
        <nav className={`nav-links ${open ? "open" : ""}`}>

          {/* 2.1. Início */}
          <div className="submenu-click">
            <span
              className="submenu-title"
              onClick={() => toggleSubmenu("instituto")}
            >
              Início
            </span>

            <div className={`submenu-box ${submenuOpen === "instituto" ? "open" : ""}`}>
              <NavLink to="/sobre" onClick={closeAll}>Sobre</NavLink>
              <NavLink to="/plataforma" onClick={closeAll}>Plataforma</NavLink>
              <NavLink to="/contato" onClick={closeAll}>Contato</NavLink>
            </div>
          </div>

          {/* 2.2. Instituto */}
          <div className="submenu-click">
            <span
              className="submenu-title"
              onClick={() => toggleSubmenu("instituto")}
            >
              Instituto
            </span>

            <div className={`submenu-box ${submenuOpen === "instituto" ? "open" : ""}`}>
              <NavLink to="/documentos" onClick={closeAll}>Documentos</NavLink>
              <NavLink to="/relatorios" onClick={closeAll}>Relatórios</NavLink>
              <NavLink to="/lapgenic" onClick={closeAll}>Lapgenic</NavLink>
            </div>
          </div>

          {/* 2.3. Publicações */}
          <div className="submenu-click">
            <span
              className="submenu-title"
              onClick={() => toggleSubmenu("publicacoes")}
            >
              Publicações
            </span>

            <div className={`submenu-box ${submenuOpen === "publicacoes" ? "open" : ""}`}>
              <NavLink to="/noticias" onClick={closeAll}>Notícias</NavLink>
              <NavLink to="/artigos" onClick={closeAll}>Artigos</NavLink>
              <NavLink to="/eventos" onClick={closeAll}>Eventos</NavLink>
            </div>
          </div>

          {/* 2.4. Equipe */}
          <div className="submenu-click right">
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

          {/* 2.5. acesso administrador */}
          <div className="social-links">
            <NavLink to="/admin/login" onClick={closeAll}>
              <FiUser />
            </NavLink>
          </div>

        </nav>
      </div>

      {/* 3. Redes Sociais */}
      <div className="social-bar">
          <div className="social-item">
            <FaYoutube size={16} color="#002a66" />
            <a href="https://www.youtube.com/@InstitutoNacionalONCOTTGEN" target="_blank" rel="noopener noreferrer" className="social-link">YouTube</a>
          </div>
          <div className="social-item">
            <FaInstagram size={16} color="#002a66" />
            <a href="https://www.instagram.com/inct.oncottgen/" target="_blank" rel="noopener noreferrer" className="social-link">Instagram</a>
          </div>
          <div className="social-item">
            <FaLinkedin size={16} color="#002a66" />
            <a href="https://www.linkedin.com/company/inct-oncottgen/?viewAsMember=true" target="_blank" rel="noopener noreferrer" className="social-link">LinkedIn</a>
          </div>
          <div className="social-item">
            <FaUserFriends size={16} color="#002a66" />
            <a href="https://oncottgenpesq.vercel.app" target="_blank" rel="noopener noreferrer" className="social-link">Plataforma</a>
          </div>
        </div>
    </header>
  );
}
