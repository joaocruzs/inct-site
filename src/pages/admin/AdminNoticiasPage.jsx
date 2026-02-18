import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getNoticias,
  deleteNoticia
} from "../../services/noticias.service";

export default function AdminNoticiasPage() {
  const navigate = useNavigate();

  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getNoticias();
        setNoticias(data);
      } catch {
        setErro("Erro ao carregar notícias.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  async function handleDelete(id) {
    const confirm = window.confirm(
      "Tem certeza que deseja excluir esta notícia?"
    );
    if (!confirm) return;

    try {
      await deleteNoticia(id);
      setNoticias((prev) => prev.filter((p) => p._id !== id));
    } catch {
      alert("Erro ao excluir notícia.");
    }
  }

  if (loading) return <div className="admin-page"><p>Carregando...</p></div>;
  if (erro) return <div className="admin-page"><p className="error">{erro}</p></div>;

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Noticias</h1>

        <button
          className="admin-btn primary"
          onClick={() => navigate("/admin/noticias/nova")}
        >
          + Nova Notícia
        </button>
      </div>

      {noticias.length === 0 ? (
        <p>Nenhuma notícia cadastrada.</p>
      ) : (
        <div className="admin-table">
          {noticias.map((n) => (
            <div key={n._id} className="admin-row">

              <div className="admin-cell title">
                <strong>{n.titulo}</strong>
                <span className="admin-meta">
                  {n.resumo} • {n.data}
                </span>
              </div>

              <div className="admin-cell actions">
                <button
                  className="admin-btn edit"
                  onClick={() =>
                    navigate(`/admin/noticias/editar/${n._id}`)
                  }
                >
                  Editar
                </button>

                <button
                  className="admin-btn delete"
                  onClick={() => handleDelete(n._id)}
                >
                  Excluir
                </button>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}
