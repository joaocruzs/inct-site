import { apiFetch } from "./api.js";

export async function listarArquivos(donoId, pastaId = null) {
  const query = pastaId ? `?pastaId=${pastaId}` : "";
  const res = await apiFetch(`/arquivos/${donoId}${query}`);
  if (!res?.ok) throw new Error("Erro ao listar arquivos");
  return res.json();
}

export async function uploadArquivo(arquivo, pastaId = null) {
  const formData = new FormData();
  formData.append("arquivo", arquivo);
  const query = pastaId ? `?pastaId=${pastaId}` : "";
  const res = await apiFetch(`/arquivos${query}`, {
    method: "POST",
    body: formData,
  });
  if (!res?.ok) throw new Error("Erro ao enviar arquivo");
  return res.json();
}

export async function criarPasta({ nome, pastaId = null }) {
  const res = await apiFetch("/arquivos/pasta", {
    method: "POST",
    body: JSON.stringify({ nome, pastaId }),
  });
  if (!res?.ok) throw new Error("Erro ao criar pasta");
  return res.json();
}

export async function getUrlVisualizacao(id) {
  const res = await apiFetch(`/arquivos/${id}/visualizar`);
  if (!res?.ok) throw new Error("Erro ao gerar URL");
  const { url } = await res.json();
  const parsed = new URL(url);
  parsed.searchParams.delete("b2ContentDisposition");
  return parsed.toString();
}

export async function renomearArquivo(id, nome) {
  const res = await apiFetch(`/arquivos/${id}/renomear`, {
    method: "PATCH",
    body: JSON.stringify({ nome }),
  });
  if (!res?.ok) throw new Error("Erro ao renomear");
  return res.json();
}

export async function deletarArquivo(id) {
  const res = await apiFetch(`/arquivos/${id}`, { method: "DELETE" });
  if (!res?.ok) throw new Error("Erro ao deletar arquivo");
}
