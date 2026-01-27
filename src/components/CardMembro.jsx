export default function CardMembro({
  nome,
  categoria,
  formacao,
  nivel,
  instituicao,
  areas,
  link,
  imagem,
  email
}) {
  return (
    <div className="card-membro-full">
      
      {/* Foto */}
      <div className="card-membro-img">
        <img src={imagem || "/imagens/default.png"} alt={nome} />
      </div>

      {/* Nome */}
      <h3 className="card-membro-nome">{nome}</h3>

      {/* Categoria */}
      {categoria && <p className="card-membro-cat">{categoria}</p>}

      {/* Formação */}
      {formacao && (
        <p className="card-membro-info">
          <strong>Formação: </strong> {formacao}
        </p>
      )}

      {/* Nível (para alunos de pós) */}
      {nivel && (
        <p className="card-membro-info">
          <strong>Nível: </strong> {nivel}
        </p>
      )}

      {/* Instituição */}
      {instituicao && (
        <p className="card-membro-info">
          <strong>Instituição: </strong> {instituicao}
        </p>
      )}

      {/* Áreas */}
      {areas && (
        <p className="card-membro-info">
          <strong>Áreas: </strong> {Array.isArray(areas) ? areas.join(", ") : areas}
        </p>
      )}

      {/* Lattes */}
      {link && (
        <p className="card-membro-info">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="card-membro-link"
          >
            Acessar currículo
          </a>
        </p>
      )}

      {email && (
        <p className="card-membro-info">
          <strong>Email: </strong> {email}
        </p>
      )}
    </div>
  );
}
