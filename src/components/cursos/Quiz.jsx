import { useState } from "react";

export default function Quiz({ questoes }) {
  const [respostas, setRespostas] = useState({});

  function responder(qIdx, altIdx) {
    if (respostas[qIdx] !== undefined) return;
    setRespostas((prev) => ({ ...prev, [qIdx]: altIdx }));
  }

  return (
    <div className="quiz">
      {questoes.map((q, qIdx) => {
        const respondida = respostas[qIdx] !== undefined;
        const selecionada = respostas[qIdx];

        return (
          <div key={qIdx} className="quiz-questao">
            <p className="quiz-questao-enunciado">
              {qIdx + 1}. {q.enunciado}
            </p>

            <div className="quiz-alternativas">
              {q.alternativas.map((alt, altIdx) => {
                let classe = "quiz-alternativa";
                if (respondida) {
                  if (alt.correta) classe += " correta";
                  else if (altIdx === selecionada && !alt.correta) classe += " errada";
                }

                return (
                  <button
                    key={altIdx}
                    className={classe}
                    onClick={() => responder(qIdx, altIdx)}
                    disabled={respondida}
                  >
                    <span className="quiz-letra">
                      {String.fromCharCode(65 + altIdx)}.
                    </span>
                    {alt.texto}
                  </button>
                );
              })}
            </div>

            {respondida && q.explicacao && (
              <p className="quiz-explicacao">{q.explicacao}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
