export default function Legend() {
  return (
    <div className="bg-white p-4 w-48 rounded-xl shadow-lg text-base">
      <h3 className="font-bold mb-3 text-gray-800">Magnitude</h3>

      <div className="flex items-center mb-2">
        <span className="w-5 h-5 bg-green-500 inline-block mr-3 rounded-sm"></span>
        <span>Low (&lt; 3)</span>
      </div>

      <div className="flex items-center mb-2">
        <span className="w-5 h-5 bg-orange-500 inline-block mr-3 rounded-sm"></span>
        <span>Moderate (3 - 5)</span>
      </div>

      <div className="flex items-center">
        <span className="w-5 h-5 bg-red-500 inline-block mr-3 rounded-sm"></span>
        <span>High (&ge; 5)</span>
      </div>
    </div>
  );
}
