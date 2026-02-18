/* MOCK TEMPORÁRIO COM CRUD COMPLETO */
/* Depois será substituído por chamadas reais ao backend */

let mockDestaques = [
  {
    "titulo": "INCT OncoTTGen",
    "subtitulo": "Pesquisa e inovação em oncologia translacional",
    "imagem": "banners/oncottgen.png",
    "link": "/sobre"
  },
  {
    "titulo": "Plataforma de Colaboração",
    "subtitulo": "Ambiente dedicado aos pesquisadores",
    "imagem": "banners/plataforma.png",
    "link": "https://oncottgenpesq.vercel.app",
    "externo": true
  },
  {
    "titulo": "Conheça nosso Canal no YouTube",
    "subtitulo": "",
    "imagem": "banners/youtube.png",
    "link": "https://www.youtube.com/@InstitutoNacionalONCOTTGEN",
    "externo": true
  },
  {
    "titulo": "Siga-nos no Instagram",
    "subtitulo": "",
    "imagem": "banners/instagram.png",
    "link": "https://www.instagram.com/inct.oncottgen/",
    "externo": true
  },
  {
    "titulo": "Saiba mais no LinkedIn",
    "subtitulo": "",
    "imagem": "banners/linkedin.png",
    "link": "https://www.linkedin.com/company/inct-oncottgen/?viewAsMember=true",
    "externo": true
  }
];

/* Simula delay de API */
function simulateDelay(response) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(response), 300);
  });
}

/* ========================= */
/* GET ALL */
/* ========================= */
export async function getDestaques() {
  // Ordena do mais recente para o mais antigo
  const ordenados = [...mockDestaques].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return simulateDelay(ordenados);
}

/* ========================= */
/* GET BY ID */
/* ========================= */
export async function getDestaqueById(id) {
  const destaque = mockDestaques.find((d) => d._id === id);

  if (!destaque) {
    throw new Error("Destaque não encontrado");
  }

  return simulateDelay(destaque);
}

/* ========================= */
/* CREATE */
/* ========================= */
export async function createDestaque(data) {
  const novo = {
    ...data,
    _id: Date.now().toString(),
    createdAt: new Date()
  };

  mockDestaques.push(novo);

  return simulateDelay(novo);
}

/* ========================= */
/* UPDATE */
/* ========================= */
export async function updateDestaque(id, data) {
  const index = mockDestaques.findIndex((d) => d._id === id);

  if (index === -1) {
    throw new Error("Destaque não encontrado");
  }

  mockDestaques[index] = {
    ...mockDestaques[index],
    ...data
  };

  return simulateDelay(mockDestaques[index]);
}

/* ========================= */
/* DELETE */
/* ========================= */
export async function deleteDestaque(id) {
  const index = mockDestaques.findIndex((d) => d._id === id);

  if (index === -1) {
    throw new Error("Destaque não encontrado");
  }

  const removido = mockDestaques[index];

  mockDestaques = mockDestaques.filter((d) => d._id !== id);

  return simulateDelay(removido);
}
