export default function CardNoticia({ imagem, titulo, resumo }) {
  return (
    <article className="card-noticia">
      <div className="card-noticia-img">
        <img src={imagem} alt={titulo} />
      </div>

      <div className="card-noticia-body">
        <h3>{titulo}</h3>
        <p>{resumo}</p>
      </div>
    </article>
  );
}
