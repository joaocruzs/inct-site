import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getEventos,
  deleteEvento
} from "../../services/eventos.service";

export default function AdminEventosPage() {
  const navigate = useNavigate();

  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getEventos();
        setEventos(data);
      } catch {
        setErro("Erro ao carregar eventos.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  async function handleDelete(id) {
    const confirm = window.confirm(
      "Tem certeza que deseja excluir este evento?"
    );
    if (!confirm) return;

    try {
      await deleteEvento(id);
      setEventos((prev) => prev.filter((p) => p._id !== id));
    } catch {
      alert("Erro ao excluir evento.");
    }
  }

  if (loading) return <div className="admin-page"><p>Carregando...</p></div>;
  if (erro) return <div className="admin-page"><p className="error">{erro}</p></div>;

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Eventos</h1>

        <button
          className="admin-btn primary"
          onClick={() => navigate("/admin/eventos/novo")}
        >
          + Novo Evento
        </button>
      </div>

      {eventos.length === 0 ? (
        <p>Nenhum evento cadastrado.</p>
      ) : (
        <div className="admin-table">
          {eventos.map((e) => (
            <div key={e._id} className="admin-row">

              <div className="admin-cell title">
                <strong>{e.titulo}</strong>
                <span className="admin-meta">
                  {e.resumo} • {e.dataInicio}
                </span>
              </div>

              <div className="admin-cell actions">
                {/*     
                <button
                  className="admin-btn edit"
                  onClick={() =>
                    navigate(`/admin/eventos/editar/${e._id}`)
                  }
                >
                  Editar
                </button>
                */}
                <button
                  className="admin-btn delete"
                  onClick={() => handleDelete(e._id)}
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
