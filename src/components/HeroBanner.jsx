export default function HeroBanner({ imagem, titulo, subtitulo, botaolink, botaotexto }) {
  return (
    <section className="hero">
      <img src={imagem} alt="Banner" className="hero-img" />

      <div className="hero-content container">
        <h1>{titulo}</h1>
        <p>{subtitulo}</p>
        <a className="hero-btn" href={botaolink}>{botaotexto}</a>
      </div>
    </section>
  );
}
