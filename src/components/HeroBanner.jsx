import { Link } from "react-router-dom";

export default function HeroBanner({ imagem, titulo, subtitulo, botao }) {
  return (
    <section className="hero">
      <img src={imagem} alt="Banner" className="hero-img" />

      <div className="hero-content container">
        <h1>{titulo}</h1>
        <p>{subtitulo}</p>

        {botao && (
          <Link to={botao.link} className="hero-btn">
            {botao.texto}
          </Link>
        )}
      </div>
    </section>
  );
}
