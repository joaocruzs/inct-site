import { createContext, useContext, useEffect, useRef, useState } from "react";
import { login as authLogin, logout as authLogout, getMe } from "../services/auth.js";

const AuthContext = createContext(null);

const INACTIVITY_TIMEOUT = 2 * 60 * 60 * 1000; // 2h

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const timerRef = useRef(null);

  function resetTimer() {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      authLogout();
      setUser(null);
      window.location.href = "/pesqcolab/login";
    }, INACTIVITY_TIMEOUT);
  }

  useEffect(() => {
    const token = localStorage.getItem("pesqcolab_token");
    if (token) {
      getMe()
        .then(setUser)
        .catch(() => authLogout())
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!user) return;
    const events = ["mousemove", "keydown", "click", "scroll"];
    events.forEach((e) => window.addEventListener(e, resetTimer));
    resetTimer();
    return () => {
      events.forEach((e) => window.removeEventListener(e, resetTimer));
      clearTimeout(timerRef.current);
    };
  }, [user]);

  async function login(credentials) {
    await authLogin(credentials);
    const me = await getMe();
    setUser(me);
  }

  async function refreshUser() {
    const me = await getMe();
    setUser(me);
  }

  function logout() {
    authLogout();
    setUser(null);
    clearTimeout(timerRef.current);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
