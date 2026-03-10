const BASE_URL = "https://publicacoes-inct-api.vercel.app";

export async function loginAdmin({ email, senha }) {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, senha }),
    });

    if (!response.ok) {
      throw new Error("Credenciais inválidas");
    }

    const data = await response.json();
    
    // API pode retornar: "token" | { "access_token": "..." } | { "token": "..." }
    const token = typeof data === "string" 
      ? data 
      : data.access_token || data.token || data;
      
    localStorage.setItem("admin_token", token);
    return true;
  } catch (error) {
    console.error("Erro no login:", error);
    return false;
  }
}

export function logoutAdmin() {
  localStorage.removeItem("admin_token");
}

export function isAuthenticated() {
  return !!localStorage.getItem("admin_token");
}
