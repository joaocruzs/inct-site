import { apiFetch } from "./api.js";

export async function getPesquisadores() {
  const res = await apiFetch("/pesquisadores");
  if (!res?.ok) throw new Error("Erro ao buscar pesquisadores");
  return res.json();
}

export async function getPesquisador(id) {
  const res = await apiFetch(`/pesquisadores/${id}`);
  if (!res?.ok) throw new Error("Pesquisador não encontrado");
  return res.json();
}

export async function updateMe(dados) {
  const res = await apiFetch("/pesquisadores/me", {
    method: "PATCH",
    body: JSON.stringify(dados),
  });
  if (!res?.ok) throw new Error("Erro ao atualizar perfil");
  return res.json();
}

export async function updateFoto(arquivo) {
  const formData = new FormData();
  formData.append("foto", arquivo);
  const res = await apiFetch("/pesquisadores/me/foto", {
    method: "PATCH",
    body: formData,
  });
  if (!res?.ok) throw new Error("Erro ao enviar foto");
}
