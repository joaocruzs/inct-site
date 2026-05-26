import { useRef, useState } from "react";
import { uploadArquivo } from "../services/arquivos.js";

export default function UploadArquivo({ pastaId, onUpload }) {
  const inputRef = useRef(null);
  const [erro, setErro] = useState(null);
  const [enviando, setEnviando] = useState(false);

  async function handleChange(e) {
    const arquivo = e.target.files[0];
    if (!arquivo) return;
    setErro(null);
    setEnviando(true);
    try {
      await uploadArquivo(arquivo, pastaId);
      e.target.value = "";
      onUpload();
    } catch {
      setErro("Falha no upload. Tente novamente.");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <>
      <button
        className="btn-primary"
        onClick={() => inputRef.current.click()}
        disabled={enviando}
      >
        {enviando ? "Enviando..." : "Upload"}
      </button>
      <input
        ref={inputRef}
        type="file"
        style={{ display: "none" }}
        onChange={handleChange}
      />
      {erro && <span className="upload-erro">{erro}</span>}
    </>
  );
}
