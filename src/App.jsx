import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Sobre from "./pages/Sobre";
import Equipe from "./pages/Equipe";
import Parceiros from "./pages/Parceiros";
import Noticias from "./pages/Noticias";
import Eventos from "./pages/Eventos";
import Publicacoes from "./pages/Publicacoes";
import Galeria from "./pages/Galeria";

export default function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/equipe" element={<Equipe />} />
        <Route path="/parceiros" element={<Parceiros />} />
        <Route path="/noticias" element={<Noticias />} />
        <Route path="/eventos" element={<Eventos />} />
        <Route path="/publicacoes" element={<Publicacoes />} />
        <Route path="/galeria" element={<Galeria />} />
      </Routes>

      <Footer />
    </>
  );
}
