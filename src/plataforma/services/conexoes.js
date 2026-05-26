import { apiFetch } from "./api.js";

export async function criarConexao({ pesquisadorBId, area, descricao }) {
  const res = await apiFetch("/conexoes", {
    method: "POST",
    body: JSON.stringify({ pesquisadorBId, area, descricao }),
  });
  if (!res?.ok) throw new Error("Erro ao criar conexão");
  return res.json();
}

export async function editarProjeto(conexaoId, projetoId, { area, descricao }) {
  const res = await apiFetch(`/conexoes/${conexaoId}/projetos/${projetoId}`, {
    method: "PATCH",
    body: JSON.stringify({ area, descricao }),
  });
  if (!res?.ok) throw new Error("Erro ao editar projeto");
  return res.json();
}

export async function deletarProjeto(conexaoId, projetoId) {
  const res = await apiFetch(`/conexoes/${conexaoId}/projetos/${projetoId}`, {
    method: "DELETE",
  });
  if (!res?.ok) throw new Error("Erro ao deletar projeto");
}

export async function getProjetos(modo) {
  const res = await apiFetch(`/conexoes/projetos?modo=${modo}`);
  if (!res?.ok) throw new Error("Erro ao buscar projetos");
  return res.json();
}
