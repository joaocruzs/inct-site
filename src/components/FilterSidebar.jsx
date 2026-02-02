import { useState } from "react";

export default function FilterSidebar({
  periodos = [],
  tags = [],
  laboratorios = [],
  onApply
}) {
  const [periodo, setPeriodo] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [lab, setLab] = useState(null);

  function toggleTag(tag) {
    setSelectedTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
    );
  }

  function aplicarFiltros() {
    onApply({
      periodo,
      tags: selectedTags,
      laboratorio: lab
    });
  }

  return (
    <aside className="filter-sidebar">
      <h3>Filtros</h3>

      {/* 1. BUSCA POR PERÍODO */}
      {periodos.length > 0 && (
        <div className="filter-group">
          <h4>Período</h4>
          {periodos.map((p) => (
            <label key={p.value} className="filter-option">
                <input
                type="checkbox"
                checked={periodo === p.value}
                onChange={() =>
                    setPeriodo(periodo === p.value ? null : p.value)
                }
                />
              {p.label}
            </label>
          ))}
        </div>
      )}

      {/* 2. OPÇÕES POR LABORATÓRIO */}
      {laboratorios.length > 0 && (
        <div className="filter-group">
          <h4>Laboratório</h4>
          {laboratorios.map((l) => (
            <label key={l} className="filter-option">
              <input
                type="checkbox"
                name="lab"
                checked={lab === l}
                onChange={() => setLab(l)}
              />
              {l}
            </label>
          ))}
        </div>
      )}

      {/* 3. BUSCA POR TAGS */}
      {tags.length > 0 && (
        <div className="filter-group">
          <h4>Temas</h4>
          {tags.map((tag) => (
            <label key={tag} className="filter-option">
              <input
                type="checkbox"
                checked={selectedTags.includes(tag)}
                onChange={() => toggleTag(tag)}
              />
              {tag}
            </label>
          ))}
        </div>
      )}

      {/* 4. BOTÕES APLICAR E LIMPAR */}
      <button className="filter-apply" onClick={aplicarFiltros}>
        Aplicar filtros
      </button>

      <button
        className="filter-clear"
        onClick={() => {
          setPeriodo(null);
          setSelectedTags([]);
          setLab(null);
        }}
      >
        Limpar filtros
      </button>
      
    </aside>
  );
}
