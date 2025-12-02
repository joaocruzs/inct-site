export default function CardNoticia({ imagem, titulo, resumo }) {
  return (
    <div className="card">
      <img src={imagem} alt={titulo} />
      <h3>{titulo}</h3>
      <p>{resumo}</p>
    </div>
  );
}
