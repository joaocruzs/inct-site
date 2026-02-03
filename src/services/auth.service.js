export function loginAdmin({ email, senha }) {
  // mock temporário
  if (email === "exemplo@inct.com" && senha === "7777777") {
    localStorage.setItem("admin_token", "mock-token");
    return true;
  }

  return false;
}

export function logoutAdmin() {
  localStorage.removeItem("admin_token");
}

export function isAuthenticated() {
  return !!localStorage.getItem("admin_token");
}
