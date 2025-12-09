export default function Footer() {
  return (
    <footer>
      <div className="container footer-grid">

        {/* Coluna 1 – Logo e nome */}
        <div className="footer-col">
          <img src="/imagens/logo.png" alt="Logo INCT" className="footer-logo" />
          <p className="footer-slogan">
            Instituto Nacional de Ciência e Tecnologia em Oncologia Translacional e Terapias Gênicas
          </p>
        </div>

        {/* Coluna 2 – Contato */}
        <div className="footer-col">
          <h3>Contato</h3>
          <p>Email: inctoncottgen.gmail.com</p>
          <p>Telefone: (86) 0000-0000</p>
          <p>UFPI — Teresina, Piauí</p>
        </div>

        {/* Coluna 3 – Redes Sociais */}
        <div className="footer-col">
          <h3>Redes Sociais</h3>
          <p><a href="https://www.instagram.com/inct.oncottgen/" target="_blank">Instagram</a></p>
          <p><a href="https://www.linkedin.com/company/inct-oncottgen/?viewAsMember=true" target="_blank">LinkedIn</a></p>
        </div>

      </div>

      {/* Linha inferior */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} INCT OncottGen — Todos os direitos reservados.</p>
        <p className="footer-credit">Desenvolvido pela equipe INCT OncottGen</p>
      </div>
    </footer>
  );
}
