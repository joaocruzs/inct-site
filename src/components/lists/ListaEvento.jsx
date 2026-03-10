import { Link } from "react-router-dom";

export default function ListaEvento({
  _id,
  imagem,
  titulo,
  resumo,
  dataInicio,
  dataFim,
  local
}) {
  const formatarData = (data) => {
    return new Date(data).toLocaleDateString('pt-BR');
  };

  const formatarPeriodo = () => {
    if (dataFim && dataFim !== dataInicio) {
      return `${formatarData(dataInicio)} - ${formatarData(dataFim)}`;
    }
    return formatarData(dataInicio);
  };

  return (
    <Link to={`/eventos/${_id}`} className="special-link">
      <article className="evento-list">
        <img src={imagem} alt={titulo} />

        <div className="evento-list-content">
          <span className="evento-data">
            {formatarPeriodo()}
          </span>
          <h3>{titulo}</h3>
          <p>{resumo}</p>
          {local && <span className="evento-local">📍 {local}</span>}
        </div>
      </article>
    </Link>
  );
}
