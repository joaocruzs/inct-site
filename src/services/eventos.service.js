/* =====================================================
   eventos.service.js (MOCK)
   Backend ainda não implementado
===================================================== */

/* MOCK DATA */
let MOCK_EVENTOS = [
  {
    "id": "evento-001",
    "titulo": "Título do Evento 1",
    "resumo": "Evento científico voltado à discussão de avanços em oncologia translacional e terapias gênicas.",
    "conteudo": "Programação completa do evento...",
    "imagem": "banners/inct.png",
    "dataInicio": "2024-09-12",
    "dataFim": "2024-09-14",
    "local": "Teresina - PI",
    "laboratorio": "INCT",
    "tags": ["Simpósio", "Oncologia", "Terapia Gênica"]
  }
]

/* 0. NORMALIZAÇÃO */
function normalizarEvento(e) {
  return {
    _id: e.id,
    titulo: e.titulo,
    resumo: e.resumo,
    conteudo: e.conteudo,
    imagem: e.imagem,
    dataInicio: e.dataInicio,
    dataFim: e.dataFim,
    local: e.local,
    laboratorio: e.laboratorio,
    tags: Array.isArray(e.tags) ? e.tags : []
  };
}

/* 1. BUSCAR TODOS */
export async function getEventos() {
  return MOCK_EVENTOS.map(normalizarEvento);
}

/* 2. BUSCAR POR ID */
export async function getEventoById(id) {
  const evento = MOCK_EVENTOS.find((e) => e.id === id);
  if (!evento) {
    throw new Error("Evento não encontrado");
  }
  return normalizarEvento(evento);
}

/* 3. CRIAR (ADMIN) */
export async function createEvento(evento) {
  const novo = {
    ...evento,
    id: `evento-${Date.now()}`
  };

  MOCK_EVENTOS.unshift(novo);
  return normalizarEvento(novo);
}

/* 4. ATUALIZAR (ADMIN) */
export async function updateEvento(id, dados) {
  MOCK_EVENTOS = MOCK_EVENTOS.map((e) =>
    e.id === id ? { ...e, ...dados } : e
  );

  const atualizado = MOCK_EVENTOS.find((e) => e.id === id);
  return normalizarEvento(atualizado);
}

/* 5. DELETAR (ADMIN) */
export async function deleteEvento(id) {
  MOCK_EVENTOS = MOCK_EVENTOS.filter((e) => e.id !== id);
  return true;
}
