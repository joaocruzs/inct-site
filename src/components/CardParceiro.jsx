export default function CardParceiro({
    nome,
    descricao,
    imagem,
    link
}) {
  return (
    <div className="card-membro-full">
      
        {/* Foto */}
        <div>
            <img href={link} src={imagem || "/imagens/default.png"} alt={nome} />
        </div>

        {/* Nome */}
        <h3 className="card-membro-nome">{nome}</h3>

        {/* Descrição */}
        <p>{descricao}</p>

    </div>
  );
}
