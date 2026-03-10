import { Link } from "react-router-dom";

export default function CardNoticia({ _id, imagem, titulo, resumo, data }) {
  // Função para formatar data se existir
  const formatarData = (dataString) => {
    if (!dataString) return null;
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  return (
    <article className="card-noticia-horizontal">
      <Link to={`/noticias/${_id}`} className="card-noticia-link">
        {imagem && (
          <div className="card-noticia-img">
            <img src={imagem} alt={titulo} />
          </div>
        )}
        
        <div className="card-noticia-content">
          <h3 className="noticia-titulo">{titulo}</h3>
          {data && <span className="noticia-data">{formatarData(data)}</span>}
        </div>
      </Link>
    </article>
  );
}
