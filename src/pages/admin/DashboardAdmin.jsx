import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getArtigos } from "../../services/artigos.service";
import { getEventos } from "../../services/eventos.service";
import { getNoticias } from "../../services/noticias.service";

export default function DashboardAdmin() {
  const [publicacoes, setPublicacoes] = useState([]);
  const [eventos, setEventos] = useState([]);
  const [noticias, setNoticias] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarDados() {
      try {
        const [pubs, evs, nots] = await Promise.all([
          getArtigos().catch(() => []),
          getEventos().catch(() => []),
          getNoticias().catch(() => [])
        ]);

        setPublicacoes(pubs);
        setEventos(evs);
        setNoticias(nots);
      } finally {
        setLoading(false);
      }
    }

    carregarDados();
  }, []);

  return (
    <div className="admin-dashboard">

      {/* HEADER */}
      <header className="admin-dashboard-header">
        <h1>Painel Administrativo</h1>
        <p>Gerencie eventos e publicações do INCT</p>
      </header>

      {/* CARDS DE RESUMO */}
      <section className="admin-cards">
        <div className="admin-card">
          <h3>Publicações</h3>
          <strong>{loading ? "…" : publicacoes.length}</strong>
          <Link to="/admin/publicacoes">Lista de publicações</Link>
        </div>

        <div className="admin-card">
          <h3>Notícias</h3>
          <strong>{loading ? "…" : noticias.length}</strong>
          <Link to="/admin/noticias">Lista de Notícias</Link>
        </div>

        <div className="admin-card">
          <h3>Eventos</h3>
          <strong>{loading ? "…" : eventos.length}</strong>
          <Link to="/admin/eventos">Lista de Eventos</Link>
        </div>
      </section>

      {/* LISTA RECENTE */}
      <section className="admin-recent">
        <h2>Últimas publicações</h2>

        {loading && <p className="muted">Carregando dados…</p>}

        {!loading && publicacoes.length === 0 && (
          <p className="muted">Nenhuma publicação cadastrada.</p>
        )}

        {!loading && publicacoes.length > 0 && (
          <ul>
            {publicacoes.slice(0, 5).map(p => (
              <li key={p._id}>
                <span>{p.titulo}</span>
                <small>{p.ano}</small>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* LISTA RECENTE */}
      <section className="admin-recent">
        <h2>Últimas Notícias</h2>

        {loading && <p className="muted">Carregando dados…</p>}

        {!loading && noticias.length === 0 && (
          <p className="muted">Nenhuma notícia cadastrada.</p>
        )}

        {!loading && noticias.length > 0 && (
          <ul>
            {noticias.slice(0, 5).map(n => (
              <li key={n._id}>
                <span>{n.titulo}</span>
                <small>{n.data}</small>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* LISTA RECENTE */}
      <section className="admin-recent">
        <h2>Últimos Eventos</h2>

        {loading && <p className="muted">Carregando dados…</p>}

        {!loading && eventos.length === 0 && (
          <p className="muted">Nenhum evento cadastrado.</p>
        )}

        {!loading && eventos.length > 0 && (
          <ul>
            {eventos.slice(0, 5).map(e => (
              <li key={e._id}>
                <span>{e.titulo}</span>
                <small>{e.data}</small>
              </li>
            ))}
          </ul>
        )}
      </section>

    </div>
  );
}
