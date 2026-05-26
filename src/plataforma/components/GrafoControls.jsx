export default function GrafoControls({
  modoIntegrado,
  onToggleModo,
  onZoomIn,
  onZoomOut,
  onZoomReset,
}) {
  return (
    <>
      <div className="grafo-controls__stack">
        <div className="grafo-controls__modo">
          <button className="btn-primary" onClick={onToggleModo}>
            {modoIntegrado ? "Voltar para Meu Grafo" : "Grafos Integrados"}
          </button>
        </div>
      </div>

      <div className="grafo-controls__zoom">
        <button onClick={onZoomIn} title="Aproximar">+</button>
        <button onClick={onZoomOut} title="Afastar">−</button>
        <button onClick={onZoomReset} title="Resetar zoom">⟲</button>
      </div>
    </>
  );
}
