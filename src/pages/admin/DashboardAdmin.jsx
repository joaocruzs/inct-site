import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getPublicacoes } from "../../services/publicacoes.service";
import { getNoticias } from "../../services/noticias.service";
import { getEventos } from "../../services/eventos.service";

export default function DashboardAdmin() {
  const [publicacoes, setPublicacoes] = useState([]);
  const [noticias, setNoticias] = useState([]);
  const [eventos, setEventos] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarDados() {
      try {
        const [pubs, nots, evs] = await Promise.all([
          getPublicacoes().catch(() => []),
          getNoticias().catch(() => []),
          getEventos().catch(() => [])
        ]);

        setPublicacoes(pubs);
        setNoticias(nots);
        setEventos(evs);
      } finally {
        setLoading(false);
      }
    }

    carregarDados();
  }, []);

  return (
    <AdminLayout>
      <div className="admin-dashboard">
        <header className="admin-dashboard-header">
          <h1>Painel Administrativo</h1>
          <p>Gerencie publicações, notícias e eventos</p>
        </header>

        {/* CARDS DE RESUMO */}
        <section className="admin-cards">
          <div className="admin-card">
            <h3>Publicações</h3>
            <strong>{publicacoes.length}</strong>
            <Link to="/admin/publicacao">Nova publicação</Link>
          </div>

          <div className="admin-card">
            <h3>Notícias</h3>
            <strong>{noticias.length}</strong>
            <Link to="/admin/noticia">Nova notícia</Link>
          </div>

          <div className="admin-card">
            <h3>Eventos</h3>
            <strong>{eventos.length}</strong>
            <Link to="/admin/evento">Novo evento</Link>
          </div>
        </section>

        {/* AÇÕES RÁPIDAS */}
        <section className="admin-actions">
          <h2>Ações rápidas</h2>

          <div className="admin-actions-grid">
            <Link to="/admin/publicacao" className="admin-action-btn">
              ➕ Nova Publicação
            </Link>

            <Link to="/admin/noticia" className="admin-action-btn">
              📰 Nova Notícia
            </Link>

            <Link to="/admin/evento" className="admin-action-btn">
              📅 Novo Evento
            </Link>
          </div>
        </section>

        {/* LISTA RECENTE */}
        <section className="admin-recent">
          <h2>Últimas publicações</h2>

          {loading && <p>Carregando dados...</p>}

          {!loading && publicacoes.length === 0 && (
            <p className="muted">Nenhuma publicação encontrada.</p>
          )}

          <ul>
            {publicacoes.slice(0, 5).map((p) => (
              <li key={p._id}>
                <span>{p.titulo}</span>
                <small>{p.ano}</small>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </AdminLayout>
  );
}
