import { useRef, useState } from "react";
import emailjs from "emailjs-com";
import { FaEnvelope, FaPhoneAlt, FaMapPin } from "react-icons/fa";

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
    <>
      {/* 1. HEADER */}
      <div className="contato-header">
        <h2>Entre em contato</h2>
        <p>Estamos disponíveis para colaborações, dúvidas e informações institucionais.</p>
      </div>

      <div style={{padding: '10px'}} className="page-with-sidebar contato-layout">
        {/* 2. SIDEBAR */}
        <aside className="contato-sidebar">
          <h3>Informações</h3>

          <div className="info-item">
            <FaEnvelope size={16} color="#002a66" />
            <p>inctoncottgen@gmail.com</p>
          </div>

          <div className="info-item">
            <FaMapPin size={16} color="#002a66" />
            <p>Teresina - PI</p>
          </div>

          <div className="info-item">
            <FaPhoneAlt size={16} color="#002a66" />
            <p>(86) 98100-6336</p>
          </div>

          <div className="contato-extra">
            <p>Respondemos em horário comercial.</p>
          </div>
        </aside>

        {/* FORM */}
        <div className="contato-main">

          <form ref={form} onSubmit={enviarEmail} className="contato-form">

            <div className="form-group">
              <label>Nome</label>
              <input type="text" name="name" placeholder="Seu nome completo" required />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input type="email" name="email" placeholder="seu@email.com" required />
            </div>

            <div className="form-group">
              <label>Confirme seu Email</label>
              <input type="email" name="email_confirm" placeholder="Repita seu email" required />
            </div>

            <div className="form-group">
              <label>Assunto</label>
              <input type="text" name="assunto" placeholder="Ex: Parceria institucional" required />
            </div>

            <div className="form-group">
              <label>Mensagem</label>
              <textarea name="mensagem" rows="5" placeholder="Digite sua mensagem..." required></textarea>
            </div>

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
    </>
  );
}