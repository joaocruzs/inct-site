import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../../services/auth.service";
import { Link } from "react-router-dom";

export default function LoginAdmin() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");

    const sucesso = await loginAdmin({ email, senha });

    if (sucesso) {
      navigate("/admin");
    } else {
      setErro("Credenciais inválidas");
    }
  }

  return (
    <div className="admin-login">
      <form onSubmit={handleSubmit}>
        <h1>Ambiente Administrativo</h1>

        {erro && <p className="erro">{erro}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <div>
          <button type="submit">Entrar</button>
          <Link to="/">Sair</Link>
        </div>
      </form>
    </div>
  );
}
