import { useEffect, useState } from "react";

/* PÁGINA 6 -- RELATÓRIOS  */

export default function Relatorios() {
  const [dados, setDados] = useState([]);
  const [cabecalho, setCabecalho] = useState([]);

  useEffect(() => {
    fetch("/documentos/relatorio.csv")
      .then((res) => res.text())
      .then((texto) => {
        const linhas = texto.split("\n").map(l => l.trim()).filter(Boolean);

        const tabela = linhas.map(linha => linha.split(","));
        setCabecalho(tabela[0]);
        setDados(tabela.slice(1));
      });
  }, []);

  return (
    <div className="page-relatorios">

      {/* 1. CABEÇALHO */}
      <div className="page-header">
        <h1>Relatórios do INCT</h1>
        <p>Acompanhamento mensal de desempenho</p>
      </div>

      {/* 2. TABELA */}
      <div className="tabela-wrapper">
        <table className="tabela-relatorio">
          <thead>
            <tr>
              {cabecalho.map((col, i) => (
                <th key={i}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dados.map((linha, i) => (
              <tr key={i}>
                {linha.map((cel, j) => (
                  <td key={j}>
                    {cel ? cel : "-"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}