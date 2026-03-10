/**
 * Converte automaticamente URLs de imagens em tags <img> e aplica formatação básica
 * @param {string} conteudo - Texto bruto com URLs de imagens
 * @returns {string} - HTML formatado
 */
export function formatarConteudoNoticia(conteudo) {
  if (!conteudo) return '';

  let textoFormatado = conteudo;

  // Regex para detectar URLs de imagens (standalone em linha própria)
  const imageUrlRegex = /^(https?:\/\/[^\s]+\.(jpg|jpeg|png|gif|webp|svg))(\?[^\s]*)?$/gim;
  
  // Substitui URLs de imagens por tags <img>
  textoFormatado = textoFormatado.replace(imageUrlRegex, (match) => {
    return `<img src="${match.trim()}" alt="Imagem" style="max-width: 100%; height: auto; margin: 20px 0; border-radius: 8px;" />`;
  });

  // Converte quebras de linha duplas em parágrafos
  textoFormatado = textoFormatado.split('\n\n').map(paragrafo => {
    if (paragrafo.trim()) {
      // Se já contém HTML (como nossas imagens), não envolve em <p>
      if (paragrafo.includes('<img') || paragrafo.includes('<h') || paragrafo.includes('<div')) {
        return paragrafo.trim();
      }
      return `<p>${paragrafo.trim()}</p>`;
    }
    return '';
  }).join('\n\n');

  // Converte quebras de linha simples em <br> dentro dos parágrafos
  textoFormatado = textoFormatado.replace(/\n(?![<\n])/g, '<br>');

  // Formata texto em negrito (**texto**)
  textoFormatado = textoFormatado.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  // Formata links automáticos (URLs que não são imagens)
  const linkRegex = /(https?:\/\/[^\s<>]+)(?![^<]*>)/g;
  textoFormatado = textoFormatado.replace(linkRegex, (match) => {
    // Se já está dentro de uma tag img, não converte
    return `<a href="${match}" target="_blank" rel="noopener noreferrer">${match}</a>`;
  });

  return textoFormatado;
}