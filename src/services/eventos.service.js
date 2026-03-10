const BASE_URL = "https://publicacoes-inct-api.vercel.app";

/* HELPER: Headers com autenticação */
function getAuthHeaders() {
  const token = localStorage.getItem("admin_token");
  
  return {
    "Content-Type": "application/json",
    ...(token && { "Authorization": `Bearer ${token}` })
  };
}

/* 0. NORMALIZAÇÃO */
function normalizarEvento(e) {
  return {
    _id: e.id || e._id,
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
  const res = await fetch(`${BASE_URL}/eventos`);

  if (!res.ok) {
    throw new Error("Erro ao buscar eventos");
  }

  const json = await res.json();
  
  // API pode retornar: json.data ou json diretamente  
  const eventos = Array.isArray(json) ? json : (json.data || []);
  
  return eventos.map(normalizarEvento);
}

/* 2. BUSCAR EVENTOS FUTUROS */
export async function getEventosFuturos() {
  const res = await fetch(`${BASE_URL}/eventos/futuros`);

  if (!res.ok) {
    throw new Error("Erro ao buscar eventos futuros");
  }

  const json = await res.json();
  
  // API pode retornar: json.data ou json diretamente
  const eventos = Array.isArray(json) ? json : (json.data || []);
  
  return eventos.map(normalizarEvento);
}

/* 3. BUSCAR POR ID */
export async function getEventoById(id) {
  const res = await fetch(`${BASE_URL}/eventos/${id}`);

  if (!res.ok) {
    throw new Error("Evento não encontrado");
  }

  const json = await res.json();
  return normalizarEvento(json.data);
}

/* 4. CRIAR (ADMIN) */
export async function createEvento(evento) {
  const res = await fetch(`${BASE_URL}/eventos`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(evento)
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Erro ${res.status}: ${errorText || "Erro ao criar evento"}`);
  }

  const json = await res.json();
  return json.data ? normalizarEvento(json.data) : json;
}

/* 5. ATUALIZAR (ADMIN) */
export async function updateEvento(id, evento) {
  const res = await fetch(`${BASE_URL}/eventos/${id}`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify(evento)
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Erro ${res.status}: ${errorText || "Erro ao atualizar evento"}`);
  }

  const json = await res.json();
  return json.data ? normalizarEvento(json.data) : json;
}

/* 6. DELETAR (ADMIN) */
export async function deleteEvento(id) {
  const res = await fetch(`${BASE_URL}/eventos/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders()
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Erro ${res.status}: ${errorText || "Erro ao deletar evento"}`);
  }

  return true;
}
