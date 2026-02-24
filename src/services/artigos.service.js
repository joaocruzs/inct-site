const BASE_URL = "https://publicacoes-inct-api.vercel.app";

/* 0. NORMALIZAÇÃO */
function normalizarArtigo(p) {
  let link = p.link || p.url || "";

  // garante protocolo
  if (link && !link.startsWith("http://") && !link.startsWith("https://")) {
    link = `https://${link}`;
  }

  return {
    _id: p.id || p._id,
    titulo: p.title || p.titulo,
    autores: p.author || p.autores,
    ano: p.year || p.ano,
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
export async function getArtigos() {
  const res = await fetch(`${BASE_URL}/artigos`);

  if (!res.ok) {
    throw new Error("Erro ao buscar artigos");
  }

  const json = await res.json();

  return json.data.map(normalizarArtigo);
}

/* 2. BUSCAR POR ID */
export async function getArtigoById(id) {
  const res = await fetch(`${BASE_URL}/artigos/${id}`);

  if (!res.ok) {
    throw new Error("Erro ao buscar artigo");
  }

  const json = await res.json();

  return normalizarArtigo(json.data);
}

/* 3. NOVA (Admin) */
export async function createArtigo(artigo) {
  const res = await fetch(`${BASE_URL}/artigos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(artigo)
  });

  if (!res.ok) throw new Error("Erro ao criar artigo");

  const json = await res.json();
  return json.data ? normalizarArtigo(json.data) : json;
}

/* 4. ATUALIZAR (Admin) */
export async function updateArtigo(id, artigo) {
  const res = await fetch(`${BASE_URL}/artigos/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(artigo)
  });

  if (!res.ok) throw new Error("Erro ao atualizar artigo");

  const json = await res.json();
  return json.data ? normalizarArtigo(json.data) : json; 
}

/* 5. DELETAR (Admin) */
export async function deleteArtigo(id) {
  const res = await fetch(`${BASE_URL}/artigos/${id}`, {
    method: "DELETE"
  });

  if (!res.ok) {
    throw new Error("Erro ao deletar artigo");
  }

  return true;
}

/* 6. DELETAR TODOS (Admin) */
export async function deleteAllArtigos() {
  const res = await fetch(`${BASE_URL}/artigos`, {
    method: "DELETE"
  });

  if (!res.ok) {
    throw new Error("Erro ao deletar todos os artigos");
  }

  return true;
}
