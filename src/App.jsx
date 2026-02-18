import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import Header from "./components/general/Header";
import Footer from "./components/general/Footer";

/* 1. PÚBLICO */
import Home from "./pages/Home";
import Sobre from "./pages/Sobre";
import Documentos from "./pages/Documentos";
import Plataforma from "./pages/Plataforma";
import Noticias from "./pages/Noticias";
import Noticia from "./pages/Noticia";
import Eventos from "./pages/Eventos";
import Evento from "./pages/Evento";
import Publicacoes from "./pages/Publicacoes";
import Comite from "./pages/Comite";
import Pesquisadores from "./pages/Pesquisadores";
import Parceiros from "./pages/Parceiros";
import Lapgenic from "./pages/Lapgenic";

/* 2. ADMIN */
import LoginAdmin from "./pages/admin/LoginAdmin";
import DashboardAdmin from "./pages/admin/DashboardAdmin";

import AdminPublicacoesPage from "./pages/admin/AdminPublicacoesPage";
import AdminPublicacaoForm from "./pages/admin/AdminPublicacaoForm";
import AdminNoticiasPage from "./pages/admin/AdminNoticiasPage";
import AdminNoticiaForm from "./pages/admin/AdminNoticiaForm";
import AdminEventosPage from "./pages/admin/AdminEventosPage";
import AdminEventoForm from "./pages/admin/AdminEventoForm";

import AdminLayout from "./components/admin/AdminLayout";
import ProtectedRoute from "./components/admin/ProtectedRoute";

export default function App() {
  const { pathname } = useLocation();

  const isHome = pathname === "/";
  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Header transparent={isHome} />}

      <Routes>

        {/* ===================== */}
        {/* 1. ROTAS PÚBLICAS */}
        {/* ===================== */}
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/documentos" element={<Documentos />} />
        <Route path="/plataforma" element={<Plataforma />} />

        <Route path="/noticias" element={<Noticias />} />
        <Route path="/noticias/:id" element={<Noticia />} />

        <Route path="/eventos" element={<Eventos />} />
        <Route path="/eventos/:id" element={<Evento />} />

        <Route path="/publicacoes" element={<Publicacoes />} />

        <Route path="/comite" element={<Comite />} />
        <Route path="/pesquisadores" element={<Pesquisadores />} />
        <Route path="/parceiros" element={<Parceiros />} />
        <Route path="/lapgenic" element={<Lapgenic />} />

        {/* ===================== */}
        {/* 2. LOGIN ADMIN */}
        {/* ===================== */}
        <Route path="/admin/login" element={<LoginAdmin />} />

        {/* ===================== */}
        {/* 3. ROTAS ADMIN PROTEGIDAS */}
        {/* ===================== */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          {/* Redireciona /admin → /admin/dashboard */}
          <Route index element={<Navigate to="dashboard" />} />

          <Route path="dashboard" element={<DashboardAdmin />} />

          {/* ===== NOTÍCIAS ADMIN ===== */}
          <Route path="noticias" element={<AdminNoticiasPage />} />
          <Route path="noticias/nova" element={<AdminNoticiaForm />} />
          <Route path="noticias/editar/:id" element={<AdminNoticiaForm />} />

          {/* ===== PUBLICAÇÕES ADMIN ===== */}
          <Route path="publicacoes" element={<AdminPublicacoesPage />} />
          <Route path="publicacoes/nova" element={<AdminPublicacaoForm />} />
          <Route path="publicacoes/editar/:id" element={<AdminPublicacaoForm />} />

          {/* ===== EVENTOS ADMIN ===== */}
          <Route path="eventos" element={<AdminEventosPage />} />
          <Route path="eventos/nova" element={<AdminEventoForm />} />
          <Route path="eventos/editar/:id" element={<AdminEventoForm />} />

        </Route>

      </Routes>

      {!isAdminRoute && <Footer />}
    </>
  );
}
