/* =====================================================
   noticias.service.js (MOCK)
   Backend ainda não implementado
===================================================== */

/* MOCK DATA */
let MOCK_NOTICIAS = [
  {
    "id": "noticia-001",
    "titulo": "Jornalismo: Piauí se destaca no desenvolvimento de pesquisas avançadas para o tratamento do câncer",
    "resumo": "O INCT em destaque na mídia!",
    "conteudo": "O Instituto Nacional de Ciência e Tecnologia (INCT) ONCOTTGEN foi destaque no Cidade Verde – Viva Educação pelo papel fundamental no desenvolvimento de pesquisas avançadas para o tratamento do câncer, colocando o Piauí no cenário nacional da ciência e inovação.",
    "imagem": "https://youtu.be/pOMuVEmw0x0",
    "data": "2026-02-08",
    "laboratorio": "",
    "tags": ["CRISPR", "Terapia Gênica", "Oncologia"],
    "link": "https://cidadeverde.com/cvplay/v/110660/piaui-se-destaca-no-desenvolvimento-de-pesquisas-avancadas-para-o-tratamento-do-cancer",
    "publicado": true
  }
]

/* 0. NORMALIZAÇÃO */
function normalizarNoticia(n) {
  return {
    _id: n.id,
    titulo: n.titulo,
    resumo: n.resumo,
    conteudo: n.conteudo,
    imagem: n.imagem,
    data: n.data,
    laboratorio: n.laboratorio,
    tags: Array.isArray(n.tags) ? n.tags : [],
    link: n.link,
    publicado: Boolean(n.publicado)
  };
}

/* 1. BUSCAR TODAS */
export async function getNoticias() {
  return MOCK_NOTICIAS
    .filter((n) => n.publicado)
    .map(normalizarNoticia);
}

/* 2. BUSCAR POR ID */
export async function getNoticiaById(id) {
  const noticia = MOCK_NOTICIAS.find((n) => n.id === id);
  if (!noticia) {
    throw new Error("Notícia não encontrada");
  }
  return normalizarNoticia(noticia);
}

/* 3. CRIAR (ADMIN) */
export async function createNoticia(noticia) {
  const nova = {
    ...noticia,
    id: `noticia-${Date.now()}`
  };

  MOCK_NOTICIAS.unshift(nova);
  return normalizarNoticia(nova);
}

/* 4. ATUALIZAR (ADMIN) */
export async function updateNoticia(id, dados) {
  MOCK_NOTICIAS = MOCK_NOTICIAS.map((n) =>
    n.id === id ? { ...n, ...dados } : n
  );

  const atualizada = MOCK_NOTICIAS.find((n) => n.id === id);
  return normalizarNoticia(atualizada);
}

/* 5. DELETAR (ADMIN) */
export async function deleteNoticia(id) {
  MOCK_NOTICIAS = MOCK_NOTICIAS.filter((n) => n.id !== id);
  return true;
}
