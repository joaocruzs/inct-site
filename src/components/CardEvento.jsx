export default function CardEvento({ titulo, data, local, imagem }) {
  return (
    <div className="card">
      {imagem && <img src={imagem} alt={titulo} />}
      <h3 className="text-xl font-bold mb-2">{titulo}</h3>

      <p><strong>Data:</strong> {data}</p>
      <p><strong>Local:</strong> {local}</p>
    </div>
  );
}
