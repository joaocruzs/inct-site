import { useState } from "react";
import { FaCopy } from "react-icons/fa";

export default function CardPesquisador({
  nome,
  formacao,
  instituicao,
  areas,
  link,
  imagem,
  email
}) {
  const [copiado, setCopiado] = useState("");

  function copiarTexto(texto, tipo) {
    navigator.clipboard.writeText(texto).then(() => {
      setCopiado(tipo);
      setTimeout(() => setCopiado(""), 10000);
    });
  }

  return (
    <div className="card-pesquisador">
      {/* 1. Foto */}
      <div className="card-pesquisador-img">
        <img src={imagem || "/imagens/default.png"} alt={nome} />
      </div>

      {/* 2. Nome */}
      <h3 className="card-pesquisador-nome">{nome}</h3>

      {/* 3. Formação */}
      {formacao && (
        <p className="card-pesquisador-info">
          <strong>Formação: </strong> {formacao}
        </p>
      )}

      {/* 4. Instituição */}
      {instituicao && (
        <p className="card-pesquisador-info">
          <strong>Instituição: </strong> {instituicao}
        </p>
      )}

      {/* 5. Áreas */}
      {areas && (
        <p className="card-pesquisador-info">
          <strong>Áreas: </strong> {Array.isArray(areas) ? areas.join(", ") : areas}
        </p>
      )}

      {/* 6. Lattes */}
      {link && (
        <p className="card-pesquisador-info">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="card-pesquisador-link"
          >
            Acessar currículo
          </a>
        </p>
      )}

      {/*7. Email */}
      {email && (
        <div
          className="copy-item"
          onClick={() => copiarTexto(email, "email")}
        >
          <p className="card-pesquisador-info"><FaCopy /> {email}</p>

          <div className="copy-action">
            {copiado === "email" ? "Copiado!" : <> Copiar</>}
          </div>
        </div>
      )}
    </div>
  );
}
