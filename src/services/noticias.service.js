const BASE_URL = "https://publicacoes-inct-api.vercel.app";

/* HELPER: Headers com autenticação */
function getAuthHeaders() {
  const token = localStorage.getItem("admin_token");

  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` })
  };
}

/* HELPER: valida URL */
function isValidUrl(str) {
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
}

/* HELPER: limpar payload antes de enviar */
function limparPayload(noticia) {
  return {
    ...noticia,
    laboratorio: noticia.laboratorio || undefined,
    tags: Array.isArray(noticia.tags) ? noticia.tags : []
  };
}

/* 0. NORMALIZAÇÃO */
function normalizarNoticia(n) {
  const tags = Array.isArray(n.tags) ? n.tags : [];
  const isExterna = tags.includes("EXTERNO");

  let link = null;

  if (isExterna && isValidUrl(n.conteudo)) {
    link = n.conteudo;
  }

  return {
    _id: n.id || n._id,
    titulo: n.titulo,
    resumo: n.resumo,
    conteudo: n.conteudo,
    imagem: n.imagem,
    data: n.data,
    laboratorio: n.laboratorio,
    tags,
    link,
    publicado: Boolean(n.publicado)
  };
}

/* 1. BUSCAR TODAS (Public) */
export async function getNoticias() {
  const res = await fetch(`${BASE_URL}/noticias`);

  if (!res.ok) {
    throw new Error("Erro ao buscar notícias");
  }

  const json = await res.json();
  const noticias = Array.isArray(json) ? json : json.data || [];

  return noticias.map(normalizarNoticia);
}

/* 2. BUSCAR PUBLICADAS (Public) */
export async function getNoticiasPublicadas() {
  const res = await fetch(`${BASE_URL}/noticias/publicadas`);

  if (!res.ok) {
    throw new Error("Erro ao buscar notícias publicadas");
  }

  const json = await res.json();
  const noticias = Array.isArray(json) ? json : json.data || [];

  return noticias.map(normalizarNoticia);
}

/* 3. BUSCAR POR ID */
export async function getNoticiaById(id) {
  const res = await fetch(`${BASE_URL}/noticias/${id}`);

  if (!res.ok) {
    throw new Error("Notícia não encontrada");
  }

  const json = await res.json();
  const noticia = json.data || json;

  return normalizarNoticia(noticia);
}

/* 4. CRIAR (ADMIN) */
export async function createNoticia(noticia) {
  const res = await fetch(`${BASE_URL}/noticias`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(limparPayload(noticia))
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(
      `Erro ${res.status}: ${errorText || "Erro ao criar notícia"}`
    );
  }

  const json = await res.json();
  return json.data ? normalizarNoticia(json.data) : json;
}

/* 5. ATUALIZAR (ADMIN) */
export async function updateNoticia(id, noticia) {
  const res = await fetch(`${BASE_URL}/noticias/${id}`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify(limparPayload(noticia))
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(
      `Erro ${res.status}: ${errorText || "Erro ao atualizar notícia"}`
    );
  }

  const json = await res.json();
  return json.data ? normalizarNoticia(json.data) : json;
}

/* 6. DELETAR (ADMIN) */
export async function deleteNoticia(id) {
  const res = await fetch(`${BASE_URL}/noticias/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders()
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(
      `Erro ${res.status}: ${errorText || "Erro ao deletar notícia"}`
    );
  }

  return true;
}