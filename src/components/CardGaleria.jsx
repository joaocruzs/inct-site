export default function CardGaleria({ imagem, legenda }) {
  return (
    <div className="card">
      <img src={imagem} alt={legenda} className="img-rounded" />
      {legenda && <p>{legenda}</p>}
    </div>
  );
}
