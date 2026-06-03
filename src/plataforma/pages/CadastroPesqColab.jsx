import { useState } from "react";
import { cadastrar } from "../services/auth.js";
import "../styles/plataforma.css";

const FORM_VAZIO = {
  nomeCompleto: "",
  email: "",
  senha: "",
  universidade: "",
  papel: "",
  coordenadorNome: "",
};

export default function CadastroPesqColab() {
  const [form, setForm] = useState(FORM_VAZIO);
  const [erro, setErro] = useState("");
  const [cadastrado, setCadastrado] = useState(null);
  const [carregando, setCarregando] = useState(false);

  function set(campo) {
    return (e) => setForm((f) => ({ ...f, [campo]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");
    setCadastrado(null);
    setCarregando(true);
    try {
      const resultado = await cadastrar({
        nomeCompleto: form.nomeCompleto.trim(),
        email: form.email.trim(),
        senha: form.senha,
        universidade: form.universidade.trim(),
        papel: form.papel || null,
        coordenadorNome: form.papel === "vinculado" ? (form.coordenadorNome.trim() || null) : null,
      });
      setCadastrado(resultado);
      setForm(FORM_VAZIO);
    } catch (err) {
      setErro(err.message);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="cadastro-page">
      <div className="cadastro-page__card">
        <h2>Cadastrar pesquisador</h2>

        {cadastrado && (
          <div className="cadastro-page__sucesso">
            <strong>{cadastrado.nomeCompleto}</strong> cadastrado com sucesso.
            <ul>
              <li>Email: {cadastrado.email}</li>
              <li>Universidade: {cadastrado.universidade}</li>
              {cadastrado.papel && <li>Papel: {cadastrado.papel}</li>}
              {cadastrado.coordenadorNome && <li>Coordenador: {cadastrado.coordenadorNome}</li>}
            </ul>
            <button className="btn-secundario" onClick={() => setCadastrado(null)}>
              Cadastrar outro
            </button>
          </div>
        )}

        {!cadastrado && (
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
            <label>Papel</label>
            <select value={form.papel} onChange={set("papel")}>
              <option value="">Não informado</option>
              <option value="coordenador">Coordenador</option>
              <option value="vinculado">Vinculado a um coordenador</option>
            </select>
            {form.papel === "vinculado" && (
              <>
                <label>Nome do coordenador</label>
                <input
                  type="text"
                  value={form.coordenadorNome}
                  onChange={set("coordenadorNome")}
                  placeholder="Nome completo do coordenador"
                />
              </>
            )}
            {erro && <p className="login-pesqcolab__erro">{erro}</p>}
            <button type="submit" className="btn-primary" style={{ marginTop: 16 }} disabled={carregando}>
              {carregando ? "Cadastrando..." : "Criar conta"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
