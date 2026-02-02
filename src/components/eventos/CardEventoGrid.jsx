export default function CardEventoGrid({ titulo, data, local, imagem }) {
  return (
    <article className="card-evento-grid">
      <div className="card-evento-img">
        <img src={imagem} alt={titulo} />
      </div>

      <div className="card-evento-body">
        <h3>{titulo}</h3>
        <p><strong>Data:</strong> {data}</p>
        <p><strong>Local:</strong> {local}</p>
      </div>
    </article>
  );
}
