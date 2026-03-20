import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

/* 🎨 cores por categoria */
const cores = {
  Hospitais: "#ef4444",
  "Instituições Parceiras": "#3b82f6",
  Laboratórios: "#10b981",
  "Apoio Internacional": "#8b5cf6"
};

/* 📍 classes dos pins */
const classePorCategoria = {
  Hospitais: "pin-hospital",
  "Instituições Parceiras": "pin-instituicao",
  Laboratórios: "pin-lab",
  "Apoio Internacional": "pin-internacional"
};

/* 📍 cache de ícones */
const icones = {};

const criarIcone = (categoria) => {
  const classe = classePorCategoria[categoria] || "";

  if (icones[classe]) return icones[classe];

  icones[classe] = L.divIcon({
    className: "",
    html: `<div class="custom-pin ${classe}"></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 20]
  });

  return icones[classe];
};

/* 🔥 CLUSTER CUSTOMIZADO */
const criarClusterIcon = (cluster) => {
  const count = cluster.getChildCount();

  return L.divIcon({
    html: `<div class="cluster-bubble">${count}</div>`,
    className: "custom-cluster",
    iconSize: L.point(40, 40)
  });
};

export default function MapaInstituicoes({ dados, onSelect }) {
  return (
    <MapContainer
      center={[-14.235, -51.9253]}
      zoom={4}
      style={{ height: "500px", width: "100%", borderRadius: "16px" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <MarkerClusterGroup
        chunkedLoading
        iconCreateFunction={criarClusterIcon}
      >
        {dados.map((item, index) => {
          if (!item.lat || !item.lng) return null;

          return (
            <Marker
              key={index}
              position={[item.lat, item.lng]}
              icon={criarIcone(item.categoria)}
              eventHandlers={{
                click: () => onSelect(item)
              }}
            >
              <Tooltip direction="top" offset={[0, -15]} opacity={1}>
                {item.nome}
              </Tooltip>

              <Popup>
                <strong>{item.nome}</strong>
                <br />
                {item.cidade && <span>{item.cidade}</span>}
              </Popup>
            </Marker>
          );
        })}
      </MarkerClusterGroup>
    </MapContainer>
  );
}