export default function NoticiaListItem({ imagem, titulo, resumo, data }) {
  return (
    <article className="noticia-list-item">
      <img src={imagem} alt={titulo} />

      <div className="noticia-list-content">
        <span className="noticia-data">{data}</span>
        <h3>{titulo}</h3>
        <p>{resumo}</p>
      </div>
    </article>
  );
}
