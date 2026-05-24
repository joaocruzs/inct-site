import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import Header from "./components/general/Header";
import Footer from "./components/general/Footer";

/* 1. PÚBLICO */
import Home from "./pages/Home";
import Sobre from "./pages/Sobre";
import Plataforma from "./pages/Plataforma";
import Contato from "./pages/Contato";
import Documentos from "./pages/Documentos";
import Relatorios from "./pages/Relatorios";
import Lapgenic from "./pages/Lapgenic";
import Noticias from "./pages/Noticias";
import Noticia from "./pages/Noticia";
import Eventos from "./pages/Eventos";
import Evento from "./pages/Evento";
import Artigos from "./pages/Artigos";
import Comite from "./pages/Comite";
import Pesquisadores from "./pages/Pesquisadores";
import Parceiros from "./pages/Parceiros";

/* 2. ADMIN */
import LoginAdmin from "./pages/admin/LoginAdmin";
import DashboardAdmin from "./pages/admin/DashboardAdmin";

import AdminPublicacoesPage from "./pages/admin/AdminPublicacoesPage";
import AdminPublicacaoCreate from "./pages/admin/AdminPublicacaoCreate";
import AdminPublicacaoEdit from "./pages/admin/AdminPublicacaoEdit";
import AdminNoticiasPage from "./pages/admin/AdminNoticiasPage";
import AdminNoticiaCreate from "./pages/admin/AdminNoticiaCreate";
import AdminNoticiaEdit from "./pages/admin/AdminNoticiaEdit";
import AdminEventosPage from "./pages/admin/AdminEventosPage";
import AdminEventoCreate from "./pages/admin/AdminEventoCreate";
import AdminEventoEdit from "./pages/admin/AdminEventoEdit";

import AdminLayout from "./components/admin/AdminLayout";
import ProtectedRoute from "./components/admin/ProtectedRoute";

export default function App() {
  const { pathname } = useLocation();

  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Header />}

      <Routes>

        {/* ===================== */}
        {/* 1. ROTAS PÚBLICAS */}
        {/* ===================== */}
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/plataforma" element={<Plataforma />} />
        <Route path="/contato" element={<Contato />} />

        <Route path="/documentos" element={<Documentos />} />
        <Route path="/relatorios" element={<Relatorios />} />
        <Route path="/lapgenic" element={<Lapgenic />} />

        <Route path="/noticias" element={<Noticias />} />
        <Route path="/noticias/:id" element={<Noticia />} />
        <Route path="/eventos" element={<Eventos />} />
        <Route path="/eventos/:id" element={<Evento />} />
        <Route path="/artigos" element={<Artigos />} />

        <Route path="/comite" element={<Comite />} />
        <Route path="/pesquisadores" element={<Pesquisadores />} />
        <Route path="/parceiros" element={<Parceiros />} />


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
          <Route path="noticias/nova" element={<AdminNoticiaCreate />} />
          <Route path="noticias/editar/:id" element={<AdminNoticiaEdit />} />

          {/* ===== PUBLICAÇÕES ADMIN ===== */}
          <Route path="publicacoes" element={<AdminPublicacoesPage />} />
          <Route path="publicacoes/nova" element={<AdminPublicacaoCreate />} />
          <Route path="publicacoes/editar/:id" element={<AdminPublicacaoEdit />} />

          {/* ===== EVENTOS ADMIN ===== */}
          <Route path="eventos" element={<AdminEventosPage />} />
          <Route path="eventos/nova" element={<AdminEventoCreate />} />
          <Route path="eventos/editar/:id" element={<AdminEventoEdit />} />

        </Route>

      </Routes>

      {!isAdminRoute && <Footer />}
    </>
  );
}
