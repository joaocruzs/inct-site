import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginAdmin() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();

    // TEMPORÁRIO (ANTES DO BACKEND)
    if (email === "admin@inct.com" && senha === "123456") {
      localStorage.setItem("admin-auth", "true");
      navigate("/admin/dashboard");
    } else {
      setErro("Credenciais inválidas");
    }
  }

  return (
    <div className="admin-login">
      <form onSubmit={handleLogin} className="admin-login-box">
        <h2>Acesso Administrativo</h2>

        {erro && <p className="error">{erro}</p>}

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

        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}
