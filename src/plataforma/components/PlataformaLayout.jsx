import { NavLink, Outlet, useNavigate } from "react-router-dom";
import logo from "../inct_oncottgen_logo.jpeg";
import { useAuth } from "../context/AuthContext.jsx";
import "../styles/plataforma.css";

export default function PlataformaLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/pesqcolab/login");
  }

  return (
    <div className="plataforma-layout">
      <nav className="plataforma-nav">
        <div className="plataforma-nav__logo-wrap">
          <img src={logo} alt="Plataforma de Rede OncoTTGen" className="plataforma-nav__logo-img" />
        </div>
        <div className="plataforma-nav__links">
          <NavLink to="/pesqcolab/grafo">Rede</NavLink>
          <NavLink to="/pesqcolab/projetos">Projetos</NavLink>
          <NavLink to="/pesqcolab/arquivos">Documentos</NavLink>
          <NavLink to="/pesqcolab/cadastro">Cadastrar pesquisador</NavLink>
        </div>
        <div className="plataforma-nav__user">
          <div className="plataforma-nav__avatar">
            {user?.nomeCompleto?.[0]?.toUpperCase()}
          </div>
          <span className="plataforma-nav__username">{user?.nomeCompleto?.split(" ")[0]}</span>
          <button className="plataforma-nav__logout" onClick={handleLogout}>
            Sair
          </button>
        </div>
      </nav>
      <main className="plataforma-content">
        <Outlet />
      </main>
    </div>
  );
}
