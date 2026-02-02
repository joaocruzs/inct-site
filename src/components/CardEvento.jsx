export default function CardEvento({ titulo, data, local, imagem }) {
  return (
    <article className="card-evento">
      <img src={imagem} alt={titulo} />

      <div className="card-evento-body">
        <h3>{titulo}</h3>
        <p>{data} • {local}</p>
      </div>
    </article>
  );
}
