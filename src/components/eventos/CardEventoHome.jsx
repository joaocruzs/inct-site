export default function CardEventoHome({ titulo, data, local, imagem }) {
  return (
    <article className="card-evento-home">
      <img src={imagem} alt={titulo} />

      <div className="card-evento-home-body">
        <h3>{titulo}</h3>
        <p>{data} • {local}</p>
      </div>
    </article>
  );
}
