import MapView from "./components/MapView";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Navbar / Header */}
      <header className="bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400 text-white text-center py-4 shadow-md">
        <h1 className="text-3xl font-bold tracking-wide">
          Earthquake Visualizer
        </h1>
        <p className="text-sm">Real-time earthquake monitoring powered by USGS</p>
      </header>


      {/* Content Wrapper */}
      <main className="flex-1 flex items-center justify-center p-4">
        {/* Card-style container for map */}
        <div className="w-full max-w-6xl h-[70vh] bg-white rounded-2xl shadow-lg overflow-hidden">
          <MapView />
        </div>
      </main>
      <footer className="text-center text-gray-600 py-4 text-sm">
        Built with ❤️ using React & Leaflet | Data from USGS
      </footer>
    </div>
    
  );
}

export default App;
