import { apiFetch } from "./api.js";

export async function listarProjetos(modo) {
  const url = modo ? `/projetos?modo=${modo}` : "/projetos";
  const res = await apiFetch(url);
  if (!res?.ok) throw new Error("Erro ao listar projetos");
  return res.json();
}

export async function criarProjeto({ titulo, area, descricao }) {
  const res = await apiFetch("/projetos", {
    method: "POST",
    body: JSON.stringify({ titulo, area, descricao: descricao || null }),
  });
  if (!res?.ok) throw new Error("Erro ao criar projeto");
  return res.json();
}

export async function adicionarMembro(projetoId, pesquisadorId) {
  const res = await apiFetch(`/projetos/${projetoId}/membros`, {
    method: "POST",
    body: JSON.stringify({ pesquisadorId }),
  });
  if (!res?.ok) {
    if (res?.status === 409) throw new Error("Pesquisador já é membro");
    if (res?.status === 403) throw new Error("Sem permissão");
    throw new Error("Erro ao adicionar membro");
  }
  return res.json();
}

export async function adicionarAtividade(projetoId, descricao) {
  const res = await apiFetch(`/projetos/${projetoId}/atividades`, {
    method: "POST",
    body: JSON.stringify({ descricao }),
  });
  if (!res?.ok) throw new Error("Erro ao registrar atividade");
  return res.json();
}

export async function removerAtividade(projetoId, atividadeId) {
  const res = await apiFetch(`/projetos/${projetoId}/atividades/${atividadeId}`, {
    method: "DELETE",
  });
  if (!res?.ok) throw new Error("Erro ao remover atividade");
}

export async function editarProjeto(projetoId, dados) {
  const res = await apiFetch(`/projetos/${projetoId}`, {
    method: "PATCH",
    body: JSON.stringify(dados),
  });
  if (!res?.ok) {
    if (res?.status === 403) throw new Error("Sem permissão");
    if (res?.status === 404) throw new Error("Projeto não encontrado");
    throw new Error("Erro ao editar projeto");
  }
  return res.json();
}

export async function excluirProjeto(projetoId) {
  const res = await apiFetch(`/projetos/${projetoId}`, { method: "DELETE" });
  if (!res?.ok) {
    if (res?.status === 403) throw new Error("Sem permissão");
    if (res?.status === 404) throw new Error("Projeto não encontrado");
    throw new Error("Erro ao excluir projeto");
  }
}

export async function atualizarFase(projetoId, fase) {
  const res = await apiFetch(`/projetos/${projetoId}/fase`, {
    method: "PATCH",
    body: JSON.stringify({ fase }),
  });
  if (!res?.ok) {
    if (res?.status === 403) throw new Error("Sem permissão");
    throw new Error("Erro ao atualizar fase");
  }
  return res.json();
}
