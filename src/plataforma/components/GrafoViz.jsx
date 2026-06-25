import { useCallback, useEffect, useRef, useState } from "react";
import ForceGraph2D from "react-force-graph-2d";
import { forceCollide } from "d3-force-3d";
import { extrairNomeExibicao } from "../utils/texto.js";
import noprojetoUrl from "../assets/noprojeto.jpg";

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
  el.d3Force("link")?.distance(180).strength(0.2);
  el.d3Force("charge")?.strength(-300).distanceMax(500);
  el.d3Force("collision", forceCollide(60).strength(0.8));
}

export default function GrafoViz({ dados, graphRef, onNodeClick }) {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const dadosRef = useRef(dados);

  useEffect(() => { dadosRef.current = dados; }, [dados]);

  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      setDimensions({ width, height });
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    graphRef?.current?.zoom(0.9, 300);
  }, [dados]);


  const nodeCanvasObject = useCallback((node, ctx, globalScale) => {
    const x = node.x;
    const y = node.y;
    const fontSize = Math.max(8, 11 / globalScale);

    if (node.tipo === "projeto") {
      const r = 30;

      ctx.save();
      ctx.shadowColor = "rgba(0,0,0,0.18)";
      ctx.shadowBlur = 8;
      ctx.shadowOffsetY = 2;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, 2 * Math.PI);
      ctx.fillStyle = "#eef2ff";
      ctx.fill();
      ctx.restore();

      ctx.beginPath();
      ctx.arc(x, y, r, 0, 2 * Math.PI);
      ctx.strokeStyle = "#1a5c9e";
      ctx.lineWidth = 2;
      ctx.stroke();

      const projetoImg = getImage(noprojetoUrl);
      if (projetoImg.complete && projetoImg.naturalWidth > 0) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(x, y, r, 0, 2 * Math.PI);
        ctx.clip();
        const size = Math.min(projetoImg.naturalWidth, projetoImg.naturalHeight);
        const sx = (projetoImg.naturalWidth - size) / 2;
        const sy = (projetoImg.naturalHeight - size) / 2;
        ctx.drawImage(projetoImg, sx, sy, size, size, x - r, y - r, r * 2, r * 2);
        ctx.restore();
      } else {
        drawProjetoPlaceholder(ctx, x, y, r);
      }

      const label = node.titulo || node.area || "";
      ctx.font = `600 ${fontSize}px system-ui, sans-serif`;
      ctx.fillStyle = "#0d3560";
      drawAdaptiveLabel(ctx, node, dadosRef.current?.links, label, r, fontSize);
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

      const nome = extrairNomeExibicao(node.nomeCompleto);
      const univ = node.universidade ? ` | ${node.universidade}` : "";
      const nomeLabel = `${nome}${univ}`;
      ctx.font = `${fontSize}px system-ui, sans-serif`;
      ctx.fillStyle = "#222";
      drawAdaptiveLabel(ctx, node, dadosRef.current?.links, nomeLabel, r, fontSize);
    }
  }, []);

  return (
    <div ref={containerRef} className="grafo-container">
      <ForceGraph2D
        ref={(el) => {
          if (el && graphRef) {
            graphRef.current = el;
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
        linkColor={() => "#d0d0d8"}
        linkWidth={1.5}
        d3VelocityDecay={0.3}
        d3AlphaDecay={0.02}
        cooldownTicks={150}
      />
    </div>
  );
}

function bestLabelAngle(node, links = []) {
  const angles = links
    .map((l) => {
      const src = typeof l.source === "object" ? l.source : null;
      const tgt = typeof l.target === "object" ? l.target : null;
      const srcId = src?.id ?? l.source;
      const tgtId = tgt?.id ?? l.target;
      const neighbor = srcId === node.id ? tgt : tgtId === node.id ? src : null;
      if (!neighbor || neighbor.x == null) return null;
      return Math.atan2(neighbor.y - node.y, neighbor.x - node.x);
    })
    .filter((a) => a !== null);

  if (angles.length === 0) return Math.PI / 2;

  angles.sort((a, b) => a - b);

  let maxGap = 0;
  let bestAngle = Math.PI / 2;

  for (let i = 0; i < angles.length; i++) {
    const curr = angles[i];
    const next = i + 1 < angles.length ? angles[i + 1] : angles[0] + 2 * Math.PI;
    const gap = next - curr;
    if (gap > maxGap) {
      maxGap = gap;
      bestAngle = curr + gap / 2;
    }
  }

  return bestAngle;
}

function drawAdaptiveLabel(ctx, node, links, text, r, fontSize) {
  const angle = bestLabelAngle(node, links);
  const dist = r + fontSize + 4;
  const lx = node.x + Math.cos(angle) * dist;
  const ly = node.y + Math.sin(angle) * dist;

  const cosA = Math.cos(angle);
  ctx.textAlign = cosA > 0.3 ? "left" : cosA < -0.3 ? "right" : "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, lx, ly);
  ctx.textBaseline = "alphabetic";
}

function drawProjetoPlaceholder(ctx, x, y, r) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.fillStyle = "#1a5c9e";
  ctx.fill();
  ctx.font = `bold ${r * 0.7}px system-ui, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "white";
  ctx.fillText("P", x, y);
  ctx.textBaseline = "alphabetic";
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
