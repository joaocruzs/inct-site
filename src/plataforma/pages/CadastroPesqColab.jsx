import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { cadastrar } from "../services/auth.js";
import "../styles/plataforma.css";

export default function CadastroPesqColab() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nomeCompleto: "",
    email: "",
    senha: "",
    universidade: "",
  });
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  function set(campo) {
    return (e) => setForm((f) => ({ ...f, [campo]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");
    setCarregando(true);
    try {
      await cadastrar({
        nomeCompleto: form.nomeCompleto.trim(),
        email: form.email.trim(),
        senha: form.senha,
        universidade: form.universidade.trim(),
      });
      navigate("/pesqcolab/login");
    } catch (err) {
      setErro(err.message);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="login-pesqcolab">
      <div className="login-pesqcolab__card">
        <h1>PesqColab</h1>
        <p>Criar conta — INCT Oncottgen</p>
        <form onSubmit={handleSubmit}>
          <label>Nome completo *</label>
          <input
            type="text"
            value={form.nomeCompleto}
            onChange={set("nomeCompleto")}
            autoComplete="name"
            required
            autoFocus
          />
          <label>Email *</label>
          <input
            type="email"
            value={form.email}
            onChange={set("email")}
            autoComplete="email"
            required
          />
          <label>Senha *</label>
          <input
            type="password"
            value={form.senha}
            onChange={set("senha")}
            autoComplete="new-password"
            required
            minLength={6}
          />
          <label>Sigla da universidade *</label>
          <input
            type="text"
            value={form.universidade}
            onChange={set("universidade")}
            required
          />
{erro && <p className="login-pesqcolab__erro">{erro}</p>}
          <button type="submit" className="btn-primary" style={{ marginTop: 16 }} disabled={carregando}>
            {carregando ? "Cadastrando..." : "Criar conta"}
          </button>
        </form>
        <p style={{ marginTop: 16, textAlign: "center", fontSize: 13, color: "#555" }}>
          Já tem conta? <Link to="/pesqcolab/login">Entrar</Link>
        </p>
      </div>
    </div>
  );
}
