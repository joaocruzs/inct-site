const BASE_URL = "https://publicacoes-inct-api.vercel.app";

/* 0. NORMALIZAÇÃO */
function normalizarPublicacao(p) {
  let link = p.link || p.date || "";

  // garante protocolo
  if (link && !link.startsWith("http://") && !link.startsWith("https://")) {
    link = `https://${link}`;
  }

  return {
    _id: p.id || p._id,
    titulo: p.title || p.titulo,
    autores: p.author || p.autores,
    ano: p.content || p.ano,
    link,
    post_img: p.post_img || "",
    tags: Array.isArray(p.tags)
      ? p.tags
      : typeof p.tags === "string"
        ? [p.tags]
        : []
  };
}

/* 1. BUSCAR (home e publicacoes) */
export async function getPublicacoes() {
  const res = await fetch(`${BASE_URL}/all/publicacoes`);

  if (!res.ok) {
    throw new Error("Erro ao buscar publicações");
  }

  const json = await res.json();

  return json.data.map(normalizarPublicacao);
}

/* 2. BUSCAR POR ID */
export async function getPublicacaoById(id) {
  const res = await fetch(`${BASE_URL}/publicacao/${id}`);

  if (!res.ok) {
    throw new Error("Erro ao buscar publicação");
  }

  const json = await res.json();

  return normalizarPublicacao(json.data);
}

/* 3. NOVA (Admin) */
export async function createPublicacao(publicacao) {
  const res = await fetch(`${BASE_URL}/new/publicacao`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(publicacao)
  });

  if (!res.ok) throw new Error("Erro ao criar publicação");

  const json = await res.json();
  return json.data ? normalizarPublicacao(json.data) : json;
}

/* 4. ATUALIZAR (Admin) */
export async function updatePublicacao(id, publicacao) {
  const res = await fetch(`${BASE_URL}/update/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(publicacao)
  });

  if (!res.ok) throw new Error("Erro ao atualizar publicação");

  const json = await res.json();
  return json.data ? normalizarPublicacao(json.data) : json; 
}

/* 5. DELETAR (Admin) */
export async function deletePublicacao(id) {
  const res = await fetch(`${BASE_URL}/delete/${id}`, {
    method: "DELETE"
  });

  if (!res.ok) {
    throw new Error("Erro ao deletar publicação");
  }

  return true;
}
