import { BASE_URL, apiFetch } from "./api.js";

export async function cadastrar(dados) {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail ?? "Erro ao cadastrar");
  }
  return res.json();
}

export async function login({ email, senha }) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, senha }),
  });

  if (!res.ok) throw new Error("Credenciais inválidas");

  const data = await res.json();
  localStorage.setItem("pesqcolab_token", data.access_token);
}

export async function getMe() {
  const res = await apiFetch("/auth/me");
  if (!res?.ok) throw new Error("Erro ao buscar perfil");
  const data = await res.json();
  if (data?.foto) {
    const url = new URL(data.foto);
    url.searchParams.delete("b2ContentDisposition");
    data.foto = url.toString();
  }
  return data;
}

export function logout() {
  localStorage.removeItem("pesqcolab_token");
}

export function getToken() {
  return localStorage.getItem("pesqcolab_token");
}