export default function CardParceiro({
    nome,
    descricao,
    imagem,
    link
}) {
  return (
    <div className="card-membro-full">
      
        {/* 1. Foto clicável apenas se houver link */}
        {link ? (
          <a 
            href={link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="card-parceiro-link-foto"
          >
            <img src={imagem || "/imagens/default.png"} alt={nome} />
          </a>
        ) : (
          <div className="card-parceiro-foto">
            <img src={imagem || "/imagens/default.png"} alt={nome} />
          </div>
        )}

        {/* 2. Nome */}
        <h3 className="card-membro-nome">{nome}</h3>

        {/* 3. Descrição */}
        <p>{descricao}</p>

    </div>
  );
}