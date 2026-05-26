const BASE_URL = "https://api-pesquisadores-inct.vercel.app";

export { BASE_URL };

export async function apiFetch(path, options = {}) {
  const token = localStorage.getItem("pesqcolab_token");

  const headers = {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  const res = await fetch(`${BASE_URL}${path}`, { ...options, headers });

  if (res.status === 401) {
    localStorage.removeItem("pesqcolab_token");
    window.location.href = "/pesqcolab/login";
    return null;
  }

  return res;
}
