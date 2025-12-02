export default function CardPublicacao({ titulo, autores, ano, link }) {
  return (
    <div className="card">
      <h3 className="text-xl font-bold mb-2">{titulo}</h3>

      <p className="text-gray-600 mb-2">{autores}</p>
      <p><strong>Ano:</strong> {ano}</p>

      {link && (
        <p style={{ marginTop: "10px" }}>
          <a href={link} target="_blank" rel="noreferrer">
            Acessar publicação →
          </a>
        </p>
      )}
    </div>
  );
}
