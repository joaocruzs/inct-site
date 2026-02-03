import AdminMenu from "./AdminMenu";
import { useNavigate } from "react-router-dom";

export default function AdminLayout({ title, children }) {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("admin-auth");
    navigate("/admin");
  }

  return (
    <div className="admin-layout">
      {/* MENU LATERAL */}
      <AdminMenu />

      {/* CONTEÚDO */}
      <main className="admin-content">
        <header className="admin-header">
          <h1>{title}</h1>

          <button className="admin-logout" onClick={logout}>
            Sair
          </button>
        </header>

        <section className="admin-body">{children}</section>
      </main>
    </div>
  );
}
