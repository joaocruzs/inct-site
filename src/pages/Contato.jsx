import { useRef, useState } from "react";
import emailjs from "emailjs-com";

export default function Contato() {
  const form = useRef();

  const [status, setStatus] = useState(null);
  const [mensagemStatus, setMensagemStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const enviarEmail = (e) => {
    e.preventDefault();

    const formData = new FormData(form.current);
    const email = formData.get("email");
    const emailConfirm = formData.get("email_confirm");

    if (email !== emailConfirm) {
      setStatus("erro");
      setMensagemStatus("Os emails não coincidem. Verifique e tente novamente.");
      return;
    }

    setLoading(true);
    setStatus(null);

    emailjs.sendForm(
      "service_48af8s3",
      "template_i55bjfj",
      form.current,
      "WPazTKG2P0V_dyYoj"
    ).then(
      () => {
        setStatus("sucesso");
        setMensagemStatus("Mensagem enviada com sucesso! Entraremos em contato em breve.");
        form.current.reset();
      },
      (error) => {
        setStatus("erro");
        setMensagemStatus("Erro ao enviar. Tente novamente mais tarde.");
        console.error(error);
      }
    ).finally(() => {
      setLoading(false);
    });
  };

  return (
    <section className="container contato" style={{backgroundColor: "#bdd1e6", padding: "40px 20px", borderRadius: "16px"}}>

      {/* HEADER */}
      <div className="contato-header">
        <h2>Entre em contato</h2>
        <p>Preencha o formulário abaixo. Retornaremos o mais breve possível.</p>
      </div>

      {/* LAYOUT COM SIDEBAR */}
      <div className="page-with-sidebar contato-layout">

        {/* SIDEBAR (INFO) */}
        <aside className="contato-sidebar">
          <h3>Informações</h3>

          <p><strong>Email:</strong> inctoncottgen@gmail.com</p>
          <p><strong>Localização:</strong> Teresina - PI</p>
          <p><strong>Telefone:</strong> (86) 98100-6336</p>
        </aside>

        {/* CONTEÚDO PRINCIPAL */}
        <div className="contato-main">

          <form ref={form} onSubmit={enviarEmail} className="contato-form">

            <div className="form-group">
              <label>Nome</label>
              <input type="text" name="name" placeholder="Digite seu nome" required />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Digite seu próprio email para resposta"
                required
              />
            </div>

            <div className="form-group">
              <label>Confirme seu Email</label>
              <input
                type="email"
                name="email_confirm"
                placeholder="Repita seu email"
                required
              />
            </div>

            <div className="form-group">
              <label>Assunto</label>
              <input type="text" name="assunto" required />
            </div>

            <div className="form-group">
              <label>Mensagem</label>
              <textarea name="mensagem" rows="5" required></textarea>
            </div>

            {/* FEEDBACK INLINE */}
            {status && (
              <div className={`form-status ${status}`}>
                {mensagemStatus}
              </div>
            )}

            <button type="submit" disabled={loading}>
              {loading ? "Enviando..." : "Enviar mensagem"}
            </button>

          </form>
        </div>
      </div>
    </section>
  );
}