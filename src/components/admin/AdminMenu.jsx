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
      <h2>Admin</h2>

      <nav>
        <NavLink to="/admin">Dashboard</NavLink>
        <NavLink to="/admin/noticia/nova">Nova Notícia</NavLink>
        <NavLink to="/admin/publicacao/nova">Nova Publicação</NavLink>
        <NavLink to="/admin/evento/novo">Novo Evento</NavLink>
      </nav>

      <button onClick={handleLogout}>Sair</button>
    </aside>
  );
}
