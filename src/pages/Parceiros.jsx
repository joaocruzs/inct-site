import parceiros from "../data/parceiros.json";
import Section from "../components/Section";
import CardParceiro from "../components/CardParceiro";
import { useRef, useEffect, useState } from "react";

export default function Parceiros() {
  const grupos = parceiros.reduce((acc, parceiro) => {
    const cat = parceiro.categoria || "Outros";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(parceiro);
    return acc;
  }, {});

  const refs = Object.keys(grupos).reduce((acc, cat) => {
    acc[cat] = useRef(null);
    return acc;
  }, {});

  return (
    <div>
      {/* ======== SEÇÕES ========= */}
      {Object.keys(grupos).map((categoria, index) => (
        <div key={index} ref={refs[categoria]}>
          <Section title={categoria}>
            <div className="membros-grid">
              {grupos[categoria].map((m, i) => (
                <CardParceiro
                  key={i}
                  nome={m.nome}
                  descricao={m.descricao}
                  imagem={m.imagem}
                  link={m.link}
                />
              ))}
            </div>
          </Section>
        </div>
      ))}
    </div>
  );
}
