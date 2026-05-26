import { apiFetch } from "./api.js";

function limparFotos(grafo) {
  return {
    ...grafo,
    nodes: grafo.nodes.map((n) => {
      if (!n.foto) return n;
      const url = new URL(n.foto);
      url.searchParams.delete("b2ContentDisposition");
      return { ...n, foto: url.toString() };
    }),
  };
}

export async function getGrafo() {
  const res = await apiFetch("/grafo");
  if (!res?.ok) throw new Error("Erro ao buscar grafo");
  return limparFotos(await res.json());
}

export async function getGrafoPesquisador(pesquisadorId) {
  const res = await apiFetch(`/grafo/${pesquisadorId}`);
  if (!res?.ok) throw new Error("Erro ao buscar grafo do pesquisador");
  return limparFotos(await res.json());
}
