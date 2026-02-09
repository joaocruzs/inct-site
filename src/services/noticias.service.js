/* =====================================================
   noticias.service.js (MOCK)
   Backend ainda não implementado
===================================================== */

/* MOCK DATA */
let MOCK_NOTICIAS = [
  {
    "id": "noticia-001",
    "titulo": "1 Pesquisa do INCT avança no uso de CRISPR contra tumores cerebrais",
    "resumo": "Estudo conduzido por pesquisadores do INCT-OncoTTGen.",
    "conteudo": "Texto completo da notícia...",
    "imagem": "banners/inct.png",
    "data": "2026-02-01",
    "laboratorio": "LAPGENIC",
    "tags": ["CRISPR", "Terapia Gênica", "Oncologia"],
    "publicado": true
  },
  {
    "id": "noticia-002",
    "titulo": "2 INCT-OncoTTGen promove workshop internacional em terapias gênicas",
    "resumo": "Evento reuniu pesquisadores nacionais e internacionais.",
    "conteudo": "Texto completo da notícia...",
    "imagem": "banners/inct.png",
    "data": "2025-04-22",
    "laboratorio": "INCT",
    "tags": ["Workshop", "siRNA", "Pesquisa Translacional"],
    "publicado": true
  },
  {
    "id": "noticia-003",
    "titulo": "3 Pesquisa do INCT avança no uso de CRISPR contra tumores cerebrais",
    "resumo": "Estudo conduzido por pesquisadores do INCT-OncoTTGen.",
    "conteudo": "Texto completo da notícia...",
    "imagem": "banners/inct.png",
    "data": "2026-02-01",
    "laboratorio": "LAPGENIC",
    "tags": ["CRISPR", "Terapia Gênica", "Oncologia"],
    "publicado": true
  },
  {
    "id": "noticia-004",
    "titulo": "4 INCT-OncoTTGen promove workshop internacional em terapias gênicas",
    "resumo": "Evento reuniu pesquisadores nacionais e internacionais.",
    "conteudo": "Texto completo da notícia...",
    "imagem": "banners/inct.png",
    "data": "2025-04-22",
    "laboratorio": "INCT",
    "tags": ["Workshop", "siRNA", "Pesquisa Translacional"],
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
