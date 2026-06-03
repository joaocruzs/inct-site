import { useCallback, useEffect, useRef, useState } from "react";
import ForceGraph2D from "react-force-graph-2d";
import { forceCollide } from "d3-force-3d";
import { extrairNomeExibicao } from "../utils/texto.js";

const IMAGE_CACHE = new Map();

function urlKey(url) {
  try {
    const u = new URL(url);
    return u.origin + u.pathname;
  } catch {
    return url;
  }
}

function getImage(url) {
  const key = urlKey(url);
  if (IMAGE_CACHE.has(key)) return IMAGE_CACHE.get(key);
  const img = new Image();
  img.src = url;
  IMAGE_CACHE.set(key, img);
  return img;
}

export function clearImageCache(url) {
  if (url) IMAGE_CACHE.delete(urlKey(url));
}

function applyForces(el) {
  el.d3Force("link")?.distance(260);
  el.d3Force("charge")?.strength(-1800).distanceMax(600);
  el.d3Force("collision", forceCollide((node) =>
    node.tipo === "projeto" ? 110 : 60
  ).strength(1));
}

export default function GrafoViz({ dados, graphRef, onNodeClick }) {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      setDimensions({ width, height });
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);


  const nodeCanvasObject = useCallback((node, ctx, globalScale) => {
    const x = node.x;
    const y = node.y;
    const fontSize = Math.max(8, 11 / globalScale);

    if (node.tipo === "projeto") {
      const maxLineWidth = 100;
      const lineH = fontSize * 1.4;
      const pad = { x: 12, y: 8 };
      const rad = 8;

      ctx.font = `600 ${fontSize}px system-ui, sans-serif`;
      const label = node.area || node.titulo || node.nomeCompleto || "Projeto";
      const linhas = quebrarTexto(ctx, label, maxLineWidth, 2);

      const hw = maxLineWidth / 2 + pad.x;
      const hh = (linhas.length * lineH) / 2 + pad.y;

      // sombra
      ctx.save();
      ctx.shadowColor = "rgba(0,0,0,0.12)";
      ctx.shadowBlur = 8;
      ctx.shadowOffsetY = 2;
      roundRect(ctx, x - hw, y - hh, hw * 2, hh * 2, rad);
      ctx.fillStyle = "#eef2ff";
      ctx.fill();
      ctx.restore();

      // borda
      roundRect(ctx, x - hw, y - hh, hw * 2, hh * 2, rad);
      ctx.strokeStyle = "#1a5c9e";
      ctx.lineWidth = 2;
      ctx.stroke();

      // texto
      ctx.font = `600 ${fontSize}px system-ui, sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#0d3560";
      const startY = y - ((linhas.length - 1) * lineH) / 2;
      linhas.forEach((linha, i) => ctx.fillText(linha, x, startY + i * lineH));
      ctx.textBaseline = "alphabetic";
    } else {
      const r = 24;

      ctx.save();
      ctx.shadowColor = "rgba(0,0,0,0.18)";
      ctx.shadowBlur = 8;
      ctx.shadowOffsetY = 2;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, 2 * Math.PI);
      ctx.fillStyle = "white";
      ctx.fill();
      ctx.restore();

      ctx.beginPath();
      ctx.arc(x, y, r, 0, 2 * Math.PI);
      ctx.strokeStyle = "#e8e8ed";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      if (node.foto) {
        const img = getImage(node.foto);
        if (img.complete && img.naturalWidth > 0) {
          ctx.save();
          ctx.beginPath();
          ctx.arc(x, y, r, 0, 2 * Math.PI);
          ctx.clip();
          const size = Math.min(img.naturalWidth, img.naturalHeight);
          const sx = (img.naturalWidth - size) / 2;
          const sy = (img.naturalHeight - size) / 2;
          ctx.drawImage(img, sx, sy, size, size, x - r, y - r, r * 2, r * 2);
          ctx.restore();
        } else {
          drawPlaceholder(ctx, x, y, r, node.nomeCompleto);
        }
      } else {
        drawPlaceholder(ctx, x, y, r, node.nomeCompleto);
      }

      ctx.textAlign = "center";

      if (node.titulacao) {
        ctx.font = `bold ${fontSize}px system-ui, sans-serif`;
        ctx.fillStyle = "#555";
        ctx.fillText(node.titulacao, x, y + r + fontSize + 2);
      }

      const nome = extrairNomeExibicao(node.nomeCompleto);
      const univ = node.universidade ? ` | ${node.universidade}` : "";
      ctx.font = `${fontSize}px system-ui, sans-serif`;
      ctx.fillStyle = "#222";
      ctx.fillText(`${nome}${univ}`, x, y + r + fontSize * 2 + 4);
    }
  }, []);

  return (
    <div ref={containerRef} className="grafo-container">
      <ForceGraph2D
        ref={(el) => {
          if (el && graphRef) {
            graphRef.current = el;
            el.zoom(1.4, 0);
            applyForces(el);
          }
        }}
        graphData={dados}
        width={dimensions.width}
        height={dimensions.height}
        nodeLabel={(node) => node.tipo === "projeto" ? node.titulo : node.nomeCompleto}
        nodeCanvasObject={nodeCanvasObject}
        nodeCanvasObjectMode={() => "replace"}
        nodeRelSize={24}
        onNodeClick={(node) => onNodeClick?.(node)}
        dagMode="radialout"
        dagLevelDistance={180}
        linkColor={() => "#d0d0d8"}
        linkWidth={1.5}
        d3VelocityDecay={0.4}
        d3AlphaDecay={0.03}
        warmupTicks={200}
        cooldownTicks={50}
      />
    </div>
  );
}

function quebrarTexto(ctx, texto, maxWidth, maxLinhas = 2) {
  const palavras = texto.split(" ");
  const linhas = [];
  let atual = "";
  for (const palavra of palavras) {
    const candidato = atual ? `${atual} ${palavra}` : palavra;
    if (ctx.measureText(candidato).width > maxWidth && atual) {
      linhas.push(atual);
      atual = palavra;
      if (linhas.length === maxLinhas - 1) {
        const resto = palavras.slice(palavras.indexOf(palavra)).join(" ");
        let cortado = resto;
        while (ctx.measureText(cortado + "…").width > maxWidth && cortado.length > 1) {
          cortado = cortado.slice(0, -1).trimEnd();
        }
        linhas.push(cortado + "…");
        return linhas;
      }
    } else {
      atual = candidato;
    }
  }
  if (atual) linhas.push(atual);
  return linhas;
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.arcTo(x + w, y, x + w, y + r, r);
  ctx.lineTo(x + w, y + h - r);
  ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
  ctx.lineTo(x + r, y + h);
  ctx.arcTo(x, y + h, x, y + h - r, r);
  ctx.lineTo(x, y + r);
  ctx.arcTo(x, y, x + r, y, r);
  ctx.closePath();
}

function drawPlaceholder(ctx, x, y, r, nomeCompleto) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.fillStyle = "#1e3a5f";
  ctx.fill();
  ctx.font = `bold ${r}px system-ui, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "white";
  ctx.fillText(nomeCompleto?.[0] ?? "?", x, y);
  ctx.textBaseline = "alphabetic";
}
