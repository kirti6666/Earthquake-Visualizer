export default function RedZone({ earthquakes }) {
  const redZoneQuakes = earthquakes.filter((q) => q.properties.mag >= 5);

  if (redZoneQuakes.length === 0) {
    return (
      <div className="bg-white/95 p-4 rounded-xl shadow-lg w-80 border-l-4 border-red-500 animate-fadeIn">
        <h2 className="text-lg font-bold text-red-600 flex items-center gap-2 mb-2">
          🌍 Red Zone (≥ 5)
        </h2>
        <p className="text-gray-600 text-sm">No major earthquakes right now 🚫</p>
      </div>
    );
  }

  return (
    <div className="bg-white/95 p-4 rounded-xl shadow-lg w-80 border-l-4 ">
      <h2 className="text-lg font-bold text-red-600 flex items-center gap-2 mb-3">
        🌍 Red Zone (≥ 5)
      </h2>
      <ul className="space-y-3 text-sm">
        {redZoneQuakes.map((quake) => (
          <li
            key={quake.id}
            className="border-b border-gray-200 last:border-none pb-2"
          >
            <p className="font-semibold text-gray-800">
              {quake.properties.place}
            </p>
            <p className="text-gray-600">
              <span className="font-medium text-red-500">
                Magnitude {quake.properties.mag}
              </span>{" "}
              | {new Date(quake.properties.time).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
