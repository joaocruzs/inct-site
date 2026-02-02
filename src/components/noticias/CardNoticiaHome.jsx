export default function CardNoticiaHome({ imagem, titulo, resumo }) {
  return (
    <article className="card-noticia-home">
      <div className="card-noticia-home-img">
        <img src={imagem} alt={titulo} />
      </div>

      <div className="card-noticia-home-body">
        <h3>{titulo}</h3>
        <p>{resumo}</p>
      </div>
    </article>
  );
}
