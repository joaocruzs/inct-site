export default function ListaEvento({ titulo, data, local, imagem, resumo }) {
  return (
    <article className="evento-list">
      <img src={imagem} alt={titulo} />

      <div className="evento-list-content">
        <span className="evento-meta">{data} • {local}</span>
        <h3>{titulo}</h3>
        <p>{resumo}</p>
      </div>
    </article>
  );
}
