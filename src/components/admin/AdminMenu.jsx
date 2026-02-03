import { NavLink } from "react-router-dom";

export default function AdminMenu() {
  return (
    <aside className="admin-menu">
      <div className="admin-menu-title">
        <strong>INCT</strong>
        <span>Painel Admin</span>
      </div>

      <nav>
        <NavLink to="/admin/dashboard">Dashboard</NavLink>

        <span className="menu-section">Conteúdo</span>

        <NavLink to="/admin/noticia">Nova Notícia</NavLink>
        <NavLink to="/admin/evento">Novo Evento</NavLink>
        <NavLink to="/admin/publicacao">Nova Publicação</NavLink>
      </nav>
    </aside>
  );
}
