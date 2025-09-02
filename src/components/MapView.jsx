import { useState, useEffect, useMemo } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Legend from "./Legend";
import RedZone from "./RedZone";
import QuakeList from "./QuakeList";

/* ---------------- Icons ---------------- */
const icons = {
  green: L.icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  }),
  orange: L.icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  }),
  red: L.icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  }),
};

const getIcon = (magnitude) => {
  if (magnitude >= 5) return icons.red;
  if (magnitude >= 3) return icons.orange;
  return icons.green;
};

/* --------- Fly the map to a quake when selected --------- */
function FlyToQuake({ quake }) {
  const map = useMap();
  useEffect(() => {
    if (!quake) return;
    const [lng, lat] = quake.geometry.coordinates;
    map.flyTo([lat, lng], 6, { duration: 2 });
  }, [quake, map]);
  return null;
}

/* --------- Marker component (opens popup when selected) --------- */
function QuakeMarker({ quake, isSelected, onSelect }) {
  const markerRef = useMemo(() => L.marker([0, 0]), []); // stable ref holder (not rendered)
  const [lng, lat, depth] = quake.geometry.coordinates;
  const { mag, place, time } = quake.properties;

  // Open the popup when this marker becomes selected
  useEffect(() => {
    if (isSelected && markerRef && markerRef._popup) {
      // For safety if using Leaflet instance, but with React-Leaflet we'll open via event
    }
  }, [isSelected, markerRef]);

  return (
    <Marker
      position={[lat, lng]}
      icon={getIcon(mag ?? 0)}
      // React-Leaflet gives us the rendered marker instance through the ref callback
      ref={(m) => {
        // store the real leaflet marker instance in markerRef
        if (m && m instanceof L.Marker) {
          // @ts-ignore
          markerRef.openPopup = () => m.openPopup();
          // Open popup if this is selected *after* mount/update
          if (isSelected) {
            m.openPopup();
          }
        }
      }}
      eventHandlers={{
        click: () => onSelect(quake),
      }}
    >
      <Popup>
        <div className="text-sm">
          <p><strong>{place}</strong></p>
          <p>Magnitude: {typeof mag === "number" ? mag.toFixed(1) : "N/A"}</p>
          <p>Depth: {typeof depth === "number" ? depth : "N/A"} km</p>
          <p>{new Date(time).toLocaleString()}</p>
        </div>
      </Popup>
    </Marker>
  );
}

export default function MapView() {
  const [earthquakes, setEarthquakes] = useState([]);
  const [selectedQuake, setSelectedQuake] = useState(null);
  const [showRedZone, setShowRedZone] = useState(false);
  const [showLegend, setShowLegend] = useState(false); // legend starts closed

  /* --------- Fetch data once --------- */
  useEffect(() => {
    fetch(
      "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"
    )
      .then((res) => res.json())
      .then((data) => setEarthquakes(data.features ?? []))
      .catch((err) => console.error(err));
  }, []);

  /* --------- Render markers via a child component (no hooks-in-loop) --------- */
  const markers = useMemo(
    () =>
      earthquakes.map((q) => (
        <QuakeMarker
          key={q.id}
          quake={q}
          isSelected={selectedQuake?.id === q.id}
          onSelect={setSelectedQuake}
        />
      )),
    [earthquakes, selectedQuake]
  );

  return (
    <div className="relative h-full w-full flex">
      {/* Sidebar INSIDE the layout */}
      <div className="w-72 h-full bg-white shadow-md overflow-y-auto z-[500]">
        <QuakeList
          quakes={earthquakes}
          onSelect={setSelectedQuake}
          selectedQuake={selectedQuake}
        />
      </div>

      {/* Map takes remaining space */}
      <div className="flex-1 relative">
        <MapContainer
          center={[20, 0]}
          zoom={2}
          minZoom={2}
          maxZoom={18}
          style={{ height: "100%", width: "100%" }}
          worldCopyJump={true}
          dragging={true}
          maxBounds={null}
          maxBoundsViscosity={0}
          inertia={true}
          inertiaDeceleration={2000}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />

          {/* Markers */}
          {markers}

          {/* Fly on selection */}
          <FlyToQuake quake={selectedQuake} />
        </MapContainer>
      </div>

      {/* Floating controls OUTSIDE the map */}
      {/* Legend toggle (bottom-left) */}
      <div className="fixed bottom-6 left-6 z-[9999] flex flex-col items-start gap-2">
        {showLegend && <Legend />}
        <button
          onClick={() => setShowLegend((s) => !s)}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 text-white shadow-lg hover:bg-gray-700"
          title={showLegend ? "Hide Legend" : "Show Legend"}
        >
          {showLegend ? "📉" : "📊"}
        </button>
      </div>

      {/* Red Zone Button (top-right) */}
      <button
        onClick={() => setShowRedZone((s) => !s)}
        className="fixed top-4 right-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md z-[9999]"
      >
        {showRedZone ? "Close Red Zone" : "Show Red Zone"}
      </button>

      {/* Red Zone Panel */}
      {showRedZone && (
        <div className="fixed top-16 right-4 z-[1100]">
          <RedZone earthquakes={earthquakes} />
        </div>
      )}
    </div>
  );
}
