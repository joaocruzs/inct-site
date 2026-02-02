export default function CardNoticiaGrid({ imagem, titulo, resumo }) {
  return (
    <article className="card-noticia-grid">
      <img src={imagem} alt={titulo} />

      <div className="card-noticia-grid-body">
        <h3>{titulo}</h3>
        <p>{resumo}</p>
      </div>
    </article>
  );
}
