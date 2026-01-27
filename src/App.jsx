import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Sobre from "./pages/Sobre";
import Comite from "./pages/Comite";
import Documentos from "./pages/Documentos";
import Pesquisadores from "./pages/Pesquisadores";
import Parceiros from "./pages/Parceiros";
import Noticias from "./pages/Noticias";
import Eventos from "./pages/Eventos";
import Publicacoes from "./pages/Publicacoes";
import Galeria from "./pages/Galeria";
import Lapgenic from "./pages/Lapgenic";

export default function App() {
  const { pathname } = useLocation();

  const isHome = pathname === "/" || pathname === "/#/" || pathname === "/inct-site/#/";

  return (
    <>
      <Header transparent={isHome} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/comite" element={<Comite />} />
        <Route path="/documentos" element={<Documentos />} />
        <Route path="/pesquisadores" element={<Pesquisadores />} />
        <Route path="/parceiros" element={<Parceiros />} />
        <Route path="/noticias" element={<Noticias />} />
        <Route path="/eventos" element={<Eventos />} />
        <Route path="/publicacoes" element={<Publicacoes />} />
        <Route path="/galeria" element={<Galeria />} />
        <Route path="/lapgenic" element={<Lapgenic />} />
      </Routes>

      <Footer />
    </>
  );
}
