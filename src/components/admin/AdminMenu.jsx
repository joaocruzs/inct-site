import { NavLink, useNavigate } from "react-router-dom";
import { logoutAdmin } from "../../services/auth.service";

export default function AdminMenu() {
  const navigate = useNavigate();

  function handleLogout() {
    logoutAdmin();
    navigate("/admin/login");
  }

  return (
    <aside className="admin-menu">
      <div className="admin-menu-title">
        <strong>Admin</strong>
        <span>Painel de Controle</span>
      </div>

      <nav>
        <span className="menu-section">Geral</span>
        <NavLink to="/admin/dashboard">Dashboard</NavLink>

        <span className="menu-section">Conteúdo</span>
        <NavLink to="/admin/noticias/nova">Nova Notícia</NavLink>
        <NavLink to="/admin/publicacoes/nova">Nova Publicação</NavLink>
        <NavLink to="/admin/eventos/nova">Novo Evento</NavLink>
      </nav>

      <button className="admin-logout" onClick={handleLogout}>
        Sair
      </button>
    </aside>
  );
}
