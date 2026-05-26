export function normalizar(str) {
  return str
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}

export function extrairNomeExibicao(nomeCompleto) {
  const partes = nomeCompleto?.trim().split(" ").filter((p) => p.length > 0) ?? [];
  if (partes.length < 2) return nomeCompleto ?? "";
  return `${partes[0]} ${partes[partes.length - 1]}`;
}
