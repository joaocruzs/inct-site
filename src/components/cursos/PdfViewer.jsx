import { useState, useRef, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

export default function PdfViewer({ url }) {
  const [numPages, setNumPages] = useState(null);
  const [pagina, setPagina] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(false);
  const containerRef = useRef(null);
  const [largura, setLargura] = useState(700);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      const w = entries[0].contentRect.width;
      if (w > 0) setLargura(w - 32); // 32px de padding
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  function onLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setLoading(false);
  }

  function onLoadError() {
    setLoading(false);
    setErro(true);
  }

  const zoomIn  = () => setScale((s) => Math.min(s + 0.2, 2.5));
  const zoomOut = () => setScale((s) => Math.max(s - 0.2, 0.5));

  return (
    <div className="pdf-viewer" ref={containerRef}>

      {/* CONTROLES */}
      <div className="pdf-viewer-controls">
        <button onClick={() => setPagina((p) => Math.max(p - 1, 1))} disabled={pagina <= 1}>
          ‹ Anterior
        </button>
        <span>{numPages ? `${pagina} / ${numPages}` : "—"}</span>
        <button onClick={() => setPagina((p) => Math.min(p + 1, numPages))} disabled={pagina >= numPages}>
          Próxima ›
        </button>

        <div className="pdf-viewer-zoom">
          <button onClick={zoomOut} disabled={scale <= 0.5}>−</button>
          <span>{Math.round(scale * 100)}%</span>
          <button onClick={zoomIn}  disabled={scale >= 2.5}>+</button>
        </div>

        <a href={url} target="_blank" rel="noreferrer" className="pdf-viewer-link">
          Abrir ↗
        </a>
      </div>

      {/* DOCUMENTO */}
      <div className="pdf-viewer-doc">
        {loading && <p className="pdf-viewer-loading">Carregando PDF...</p>}

        {erro && (
          <p className="pdf-viewer-error">
            Não foi possível carregar o PDF.{" "}
            <a href={url} target="_blank" rel="noreferrer">Abrir em nova aba</a>
          </p>
        )}

        <Document
          file={url}
          onLoadSuccess={onLoadSuccess}
          onLoadError={onLoadError}
          loading={null}
        >
          <Page
            pageNumber={pagina}
            width={largura * scale}
            renderAnnotationLayer
            renderTextLayer
          />
        </Document>
      </div>
    </div>
  );
}
