const BASE_URL = "https://publicacoes-inct-api.vercel.app";

/* HELPER: Headers com autenticação */
function getAuthHeaders() {
  const token = localStorage.getItem("admin_token");
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
}

/* 0. NORMALIZAÇÃO */
function normalizarCurso(c) {
  return {
    _id: c.id || c._id,
    titulo: c.titulo || "",
    descricao: c.descricao || "",
    imagem: c.imagem || "",
    tags: Array.isArray(c.tags) ? c.tags : [],
    publicado: c.publicado ?? false,
    modulos: Array.isArray(c.modulos) ? c.modulos : [],
    created_at: c.created_at || "",
    created_by: c.created_by || "",
    created_by_name: c.created_by_name || "",
  };
}

/* ===================== CURSOS ===================== */

/* 1. LISTAR PUBLICADOS (público) */
export async function getCursosPublicados() {
  const res = await fetch(`${BASE_URL}/cursos/publicados`);
  if (!res.ok) throw new Error("Erro ao buscar cursos");
  const json = await res.json();
  const data = Array.isArray(json) ? json : json.data ?? [];
  return data.map(normalizarCurso);
}

/* 2. LISTAR TODOS (admin) */
export async function getCursos() {
  const res = await fetch(`${BASE_URL}/cursos`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Erro ao buscar cursos");
  const json = await res.json();
  const data = Array.isArray(json) ? json : json.data ?? [];
  return data.map(normalizarCurso);
}

/* 3. BUSCAR POR ID */
export async function getCursoById(id) {
  const res = await fetch(`${BASE_URL}/cursos/${id}`);
  if (!res.ok) throw new Error("Erro ao buscar curso");
  const json = await res.json();
  const data = json.data ?? json;
  return normalizarCurso(data);
}

/* 4. CRIAR (admin) */
export async function createCurso(curso) {
  const res = await fetch(`${BASE_URL}/cursos`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(curso),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Erro ${res.status}: ${err}`);
  }
  const json = await res.json();
  return json;
}

/* 5. ATUALIZAR (admin) */
export async function updateCurso(id, campos) {
  const res = await fetch(`${BASE_URL}/cursos/${id}`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify(campos),
  });
  if (!res.ok) throw new Error("Erro ao atualizar curso");
  return res.json();
}

/* 6. DELETAR (admin) */
export async function deleteCurso(id) {
  const res = await fetch(`${BASE_URL}/cursos/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Erro ao deletar curso");
  return true;
}

/* ===================== MÓDULOS ===================== */

/* 7. ADICIONAR MÓDULO */
export async function addModulo(cursoId, modulo) {
  const res = await fetch(`${BASE_URL}/cursos/${cursoId}/modulos`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(modulo),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Erro ${res.status}: ${err}`);
  }
  return res.json();
}

/* 8. ATUALIZAR MÓDULO */
export async function updateModulo(cursoId, moduloId, campos) {
  const res = await fetch(`${BASE_URL}/cursos/${cursoId}/modulos/${moduloId}`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify(campos),
  });
  if (!res.ok) throw new Error("Erro ao atualizar módulo");
  return res.json();
}

/* 9. REORDENAR MÓDULOS */
export async function reordenarModulos(cursoId, ordem) {
  const res = await fetch(`${BASE_URL}/cursos/${cursoId}/modulos/reordenar`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify(ordem),
  });
  if (!res.ok) throw new Error("Erro ao reordenar módulos");
  return res.json();
}

/* 10. DELETAR MÓDULO */
export async function deleteModulo(cursoId, moduloId) {
  const res = await fetch(`${BASE_URL}/cursos/${cursoId}/modulos/${moduloId}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Erro ao deletar módulo");
  return true;
}
