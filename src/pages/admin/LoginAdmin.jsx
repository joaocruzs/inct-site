import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../../services/auth.service";
import { Link } from "react-router-dom";

export default function LoginAdmin() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState(false);

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    const ok = loginAdmin({ email, senha });

    if (ok) {
      navigate("/admin");
    } else {
      setErro(true);
    }
  }

  return (
    <div className="admin-login">
      <form onSubmit={handleSubmit}>
        <h1>Ambiente Administrativo</h1>

        {erro && <p className="erro">Credenciais inválidas</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <div>
          <button type="submit">Entrar</button>
          <Link to="/">Sair</Link>
        </div>
      </form>
    </div>
  );
}
