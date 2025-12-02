import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="header">
      <div className="container nav">

        <div className="logo">
          <img src="imagens/logo.png" alt="Logo INCT" />
        </div>

        <div className="menu-btn" onClick={() => setOpen(!open)}>
          {open ? "✕" : "☰"}
        </div>

        <nav className={`nav-links ${open ? "open" : ""}`}>
          <NavLink to="/" onClick={() => setOpen(false)}>Início</NavLink>
          <NavLink to="/sobre" onClick={() => setOpen(false)}>Instituto</NavLink>
          <NavLink to="/equipe" onClick={() => setOpen(false)}>Equipe</NavLink>
          <NavLink to="/parceiros" onClick={() => setOpen(false)}>Parceiros</NavLink>
          <NavLink to="/publicacoes" onClick={() => setOpen(false)}>Pesquisa</NavLink>
          <NavLink to="/noticias" onClick={() => setOpen(false)}>Notícias</NavLink>
          <NavLink to="/contato" onClick={() => setOpen(false)}>Contato</NavLink>
        </nav>
      </div>
    </header>
  );
}
