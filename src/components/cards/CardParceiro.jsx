export default function CardParceiro({
    nome,
    descricao,
    imagem,
    link
}) {
  return (
    <div className="card-parceiro">
      
        {/* 1. Foto clicável apenas se houver link */}
        {link ? (
          <a 
            href={link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="card-parceiro-linkado"
          >
            <img src={imagem || "/imagens/default.png"} alt={nome} />
          </a>
        ) : (
          <div>
            <img src={imagem || "/imagens/default.png"} alt={nome} />
          </div>
        )}

        {/* 2. Nome */}
        <h3 className="card-parceiro-nome">{nome}</h3>

        {/* 3. Descrição */}
        <p>{descricao}</p>

    </div>
  );
}