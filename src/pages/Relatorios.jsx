import { useEffect, useState } from "react";

export default function Relatorios() {
  const [dados, setDados] = useState([]);
  const [cabecalho, setCabecalho] = useState([]);

  useEffect(() => {
    fetch("/documentos/relatorio.csv")
      .then((res) => res.text())
      .then((texto) => {
        const linhas = texto.split("\n").map(l => l.trim()).filter(Boolean);

        const tabela = linhas.map(linha => linha.split(","));

        // primeira linha = meses
        setCabecalho(tabela[0]);

        // restante = dados
        setDados(tabela.slice(1));
      });
  }, []);

  return (
    <div className="page-relatorios">

      {/* =========================
          HEADER
      ========================== */}
      <div className="page-header">
        <h1>Relatórios do INCT</h1>
        <p>Acompanhamento mensal de desempenho</p>
      </div>

      {/* =========================
          TABELA
      ========================== */}
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