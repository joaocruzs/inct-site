import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getPublicacoes,
  deletePublicacao
} from "../../services/publicacoes.service";

export default function AdminPublicacoesPage() {
  const navigate = useNavigate();

  const [publicacoes, setPublicacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getPublicacoes();
        setPublicacoes(data);
      } catch {
        setErro("Erro ao carregar publicações.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  async function handleDelete(id) {
    const confirm = window.confirm(
      "Tem certeza que deseja excluir esta publicação?"
    );
    if (!confirm) return;

    try {
      await deletePublicacao(id);
      setPublicacoes((prev) => prev.filter((p) => p._id !== id));
    } catch {
      alert("Erro ao excluir publicação.");
    }
  }

  if (loading) return <div className="admin-page"><p>Carregando...</p></div>;
  if (erro) return <div className="admin-page"><p className="error">{erro}</p></div>;

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Publicações</h1>

        <button
          className="admin-btn primary"
          onClick={() => navigate("/admin/publicacoes/nova")}
        >
          + Nova Publicação
        </button>
      </div>

      {publicacoes.length === 0 ? (
        <p>Nenhuma publicação cadastrada.</p>
      ) : (
        <div className="admin-table">
          {publicacoes.map((p) => (
            <div key={p._id} className="admin-row">

              <div className="admin-cell title">
                <strong>{p.titulo}</strong>
                <span className="admin-meta">
                  {p.autores} • {p.ano}
                </span>
              </div>

              <div className="admin-cell actions">
                <button
                  className="admin-btn edit"
                  onClick={() =>
                    navigate(`/admin/publicacoes/editar/${p._id}`)
                  }
                >
                  Editar
                </button>

                <button
                  className="admin-btn delete"
                  onClick={() => handleDelete(p._id)}
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
