import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getCursos,
  deleteCurso,
  updateCurso,
} from "../../../services/cursos.service";

export default function AdminCursosPage() {
  const navigate = useNavigate();
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    getCursos()
      .then(setCursos)
      .catch(() => setErro("Erro ao carregar cursos."))
      .finally(() => setLoading(false));
  }, []);

  async function handleDelete(id) {
    if (!window.confirm("Excluir este curso?")) return;
    try {
      await deleteCurso(id);
      setCursos((prev) => prev.filter((c) => c._id !== id));
    } catch {
      alert("Erro ao excluir curso.");
    }
  }

  async function handleTogglePublicado(curso) {
    try {
      await updateCurso(curso._id, { publicado: !curso.publicado });
      setCursos((prev) =>
        prev.map((c) =>
          c._id === curso._id ? { ...c, publicado: !c.publicado } : c
        )
      );
    } catch {
      alert("Erro ao atualizar curso.");
    }
  }

  if (loading) return <div className="admin-page"><p>Carregando...</p></div>;
  if (erro)    return <div className="admin-page"><p className="error">{erro}</p></div>;

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Cursos</h1>
        <button
          className="admin-btn primary"
          onClick={() => navigate("/admin/cursos/novo")}
        >
          + Novo Curso
        </button>
      </div>

      {cursos.length === 0 ? (
        <p>Nenhum curso cadastrado.</p>
      ) : (
        <div className="admin-table">
          {cursos.map((c) => (
            <div key={c._id} className="admin-row">
              <div className="admin-cell title">
                <strong>{c.titulo}</strong>
                <span className="admin-meta">
                  {c.modulos.length} módulo{c.modulos.length !== 1 ? "s" : ""}
                  {" · "}
                  <span
                    style={{
                      color: c.publicado ? "#16a34a" : "#6b7280",
                      fontWeight: 600,
                    }}
                  >
                    {c.publicado ? "Publicado" : "Rascunho"}
                  </span>
                </span>
              </div>

              <div className="admin-cell actions">
                <button
                  className="admin-btn edit"
                  onClick={() => navigate(`/admin/cursos/editar/${c._id}`)}
                >
                  Editar
                </button>
                <button
                  className="admin-btn edit"
                  onClick={() => handleTogglePublicado(c)}
                >
                  {c.publicado ? "Despublicar" : "Publicar"}
                </button>
                <button
                  className="admin-btn delete"
                  onClick={() => handleDelete(c._id)}
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
