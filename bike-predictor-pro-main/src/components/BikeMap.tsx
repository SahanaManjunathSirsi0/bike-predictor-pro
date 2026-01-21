import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Bike, Users } from "lucide-react";

// Fix Leaflet default markers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const BikeMap = () => {
  const [stats, setStats] = useState({ total: 847, rented: 324, available: 523 });

  // Live stats update
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        total: Math.max(840, prev.total + Math.floor(Math.random() * 3 - 1)),
        rented: Math.floor(Math.random() * 400) + 300,
        available: Math.floor(Math.random() * 600) + 200
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Custom bike icons
  const bikeIcon = (status: string) => L.divIcon({
    html: `
      <div class="p-2 rounded-full shadow-lg border-3 border-white w-12 h-12 flex items-center justify-center
        ${status === 'available' ? 'bg-emerald-400' : status === 'in-use' ? 'bg-blue-500' : 'bg-orange-500'}">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
          <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9.99-5.28L12 3z"/>
        </svg>
      </div>
    `,
    className: "bg-transparent p-0",
    iconSize: [48, 48],
    iconAnchor: [24, 24]
  });

  // 🚴 TOP 6 CITIES - VICHVA + MAJOR WORKER HUBS
  const STATIONS = [
    // VICHVA CITY (Primary)
    { lat: 22.3073, lng: 73.1210, name: "Vichva Central", bikes: 25 },
    
    // BENGALURU (IT Capital)
    { lat: 12.9716, lng: 77.5946, name: "Whitefield IT Hub", bikes: 35 },
    { lat: 12.9249, lng: 77.6284, name: "MG Road", bikes: 28 },
    
    // NOIDA (IT + Corporate)
    { lat: 28.5355, lng: 77.3910, name: "Sector 62 IT Park", bikes: 22 },
    
    // DELHI (Corporate + Business)
    { lat: 28.6139, lng: 77.2090, name: "Connaught Place", bikes: 30 },
    
    // CHENNAI (IT + Manufacturing)
    { lat: 13.0827, lng: 80.2707, name: "OMR IT Corridor", bikes: 26 },
    
    // MUMBAI (Financial Capital)
    { lat: 19.0760, lng: 72.8777, name: "Bandra Kurla", bikes: 32 },
    { lat: 18.9388, lng: 72.8355, name: "Dadar Station", bikes: 20 }
  ];

  const BIKES = [
    // VICHVA CITY BIKES
    { id: 1, lat: 22.3073, lng: 73.1210, status: "available", station: "Vichva Central", renter: null },
    { id: 2, lat: 22.3080, lng: 73.1220, status: "in-use", station: "Vichva Central", renter: "Rahul S." },
    { id: 3, lat: 22.3065, lng: 73.1205, status: "high-demand", station: "Vichva Central", renter: null },
    
    // BENGALURU BIKES
    { id: 4, lat: 12.9716, lng: 77.5946, status: "in-use", station: "Whitefield IT Hub", renter: "Priya M." },
    { id: 5, lat: 12.9720, lng: 77.5950, status: "available", station: "Whitefield IT Hub", renter: null },
    { id: 6, lat: 12.9700, lng: 77.5930, status: "high-demand", station: "Whitefield IT Hub", renter: null },
    
    // NOIDA BIKES
    { id: 7, lat: 28.5355, lng: 77.3910, status: "in-use", station: "Sector 62 IT Park", renter: "Amit K." },
    { id: 8, lat: 28.5360, lng: 77.3920, status: "available", station: "Sector 62 IT Park", renter: null },
    
    // DELHI BIKES
    { id: 9, lat: 28.6139, lng: 77.2090, status: "high-demand", station: "Connaught Place", renter: null },
    { id: 10, lat: 28.6140, lng: 77.2080, status: "available", station: "Connaught Place", renter: null },
    
    // CHENNAI BIKES
    { id: 11, lat: 13.0827, lng: 80.2707, status: "in-use", station: "OMR IT Corridor", renter: "Divya R." },
    
    // MUMBAI BIKES
    { id: 12, lat: 19.0760, lng: 72.8777, status: "high-demand", station: "Bandra Kurla", renter: null },
    { id: 13, lat: 18.9388, lng: 72.8355, status: "available", station: "Dadar Station", renter: null }
  ];

  return (
    <div className="relative h-[450px] rounded-2xl overflow-hidden shadow-2xl border-2 border-slate-200/50">
      <MapContainer 
        center={[22.3073, 73.1210]}  // VICHVA CITY CENTER
        zoom={10} 
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={true}
      >
        {/* Real OpenStreetMap */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />

        {/* 🏢 RENTAL STATIONS - TOP CITIES */}
        {STATIONS.map((station, i) => (
          <Marker key={i} position={[station.lat, station.lng]}>
            <Popup>
              <div className="min-w-[220px] p-3">
                <h3 className="font-bold text-xl mb-2">{station.name}</h3>
                <div className="text-2xl font-black text-blue-600 mb-2">{station.bikes} bikes</div>
                <div className="text-sm text-gray-600">Available for rent</div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* 🚴 LIVE BIKES - Real Tracking */}
        {BIKES.map((bike) => (
          <Marker 
            key={bike.id} 
            position={[bike.lat, bike.lng]} 
            icon={bikeIcon(bike.status)}
          >
            <Popup>
              <div className="min-w-[260px] p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-2 rounded-full ${bike.status === 'available' ? 'bg-emerald-400' : bike.status === 'in-use' ? 'bg-blue-500' : 'bg-orange-500'} shadow-lg`}>
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9.99-5.28L12 3z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-xl">Bike #{bike.id}</h3>
                    <div className="text-sm text-gray-600">{bike.station}</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className={`font-semibold p-2 rounded-lg ${
                    bike.status === 'available' ? 'bg-emerald-100 text-emerald-800' :
                    bike.status === 'in-use' ? 'bg-blue-100 text-blue-800' : 
                    'bg-orange-100 text-orange-800'
                  }`}>
                    Status: {bike.status.replace("-", " ").toUpperCase()}
                  </div>
                  {bike.renter && (
                    <div className="p-2 bg-gray-50 rounded-lg">
                      <strong>👤 Renter:</strong> <span className="font-semibold text-blue-600 ml-1">{bike.renter}</span>
                    </div>
                  )}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* 📊 LIVE FLEET STATS */}
      <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl p-5 shadow-2xl border border-slate-200/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5 text-sm font-medium">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-emerald-400 rounded-full shadow-sm"></div>
              <span>Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded-full shadow-sm"></div>
              <span>In Use</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-orange-500 rounded-full shadow-sm"></div>
              <span>High Demand</span>
            </div>
          </div>
          <div className="font-black text-2xl text-emerald-600 flex items-center gap-3 bg-emerald-50 px-4 py-2 rounded-xl">
            <Users className="w-7 h-7" />
            Live: {stats.total} bikes | {stats.rented} rented
          </div>
        </div>
      </div>
    </div>
  );
};

export default BikeMap;
