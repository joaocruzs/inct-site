import { Routes, Route, useLocation } from "react-router-dom";

import Header from "./components/general/Header";
import Footer from "./components/general/Footer";

/* 1. PÚBLICO */
import Home from "./pages/Home";
import Sobre from "./pages/Sobre";
import Documentos from "./pages/Documentos";
import Plataforma from "./pages/Plataforma";
import Noticias from "./pages/Noticias";
import Eventos from "./pages/Eventos";
import Publicacoes from "./pages/Publicacoes";
import Comite from "./pages/Comite";
import Pesquisadores from "./pages/Pesquisadores";
import Parceiros from "./pages/Parceiros";
import Lapgenic from "./pages/Lapgenic";

/* 2. PRIVADO */
import LoginAdmin from "./pages/admin/LoginAdmin";
import DashboardAdmin from "./pages/admin/DashboardAdmin";
import NovaNoticia from "./pages/admin/NovaNoticia";
import NovoEvento from "./pages/admin/NovoEvento";
import NovaPublicacao from "./pages/admin/NovaPublicacao";

import AdminLayout from "./components/admin/AdminLayout";
import ProtectedRoute from "./components/admin/ProtectedRoute";

export default function App() {
  const { pathname } = useLocation();

  const isHome =
    pathname === "/" ||
    pathname === "/#/" ||
    pathname === "/inct-site/#/";

  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Header transparent={isHome} />}

      <Routes>
        {/* 1. ROTAS (público) */}
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/documentos" element={<Documentos />} />
        <Route path="/plataforma" element={<Plataforma />} />
        <Route path="/noticias" element={<Noticias />} />
        <Route path="/eventos" element={<Eventos />} />
        <Route path="/publicacoes" element={<Publicacoes />} />
        <Route path="/comite" element={<Comite />} />
        <Route path="/pesquisadores" element={<Pesquisadores />} />
        <Route path="/parceiros" element={<Parceiros />} />
        <Route path="/lapgenic" element={<Lapgenic />} />

        {/* 2.1 ROTA (privado) */}
        <Route path="/admin/login" element={<LoginAdmin />} />

        {/* 2.2. ROTAS ADMIN (protegidas) */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          {/* 2.2.1. dashboard */}
          <Route index element={<DashboardAdmin />} />

          {/* 2.2.2. cadastros */}
          <Route path="noticia/nova" element={<NovaNoticia />} />
          <Route path="evento/novo" element={<NovoEvento />} />
          <Route path="publicacao/nova" element={<NovaPublicacao />} />
        </Route>
      </Routes>

      {!isAdminRoute && <Footer />}
    </>
  );
}
