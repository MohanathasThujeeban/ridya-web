import { MapPin, Navigation } from "lucide-react";

export function MapPlaceholder() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-blue-50 to-green-50 rounded-lg flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-8 grid-rows-8 h-full w-full">
          {Array.from({ length: 64 }).map((_, i) => (
            <div key={i} className="border border-gray-400"></div>
          ))}
        </div>
      </div>

      {/* Map content */}
      <div className="relative z-10 text-center space-y-4">
        <div className="flex items-center justify-center space-x-4">
          <div className="bg-green-500 p-3 rounded-full shadow-lg animate-pulse">
            <MapPin className="w-6 h-6 text-white" />
          </div>
          <div className="h-px w-16 bg-gray-400 relative">
            <div className="absolute top-0 left-0 h-px bg-primary w-full animate-pulse"></div>
          </div>
          <div className="bg-red-500 p-3 rounded-full shadow-lg">
            <Navigation className="w-6 h-6 text-white" />
          </div>
        </div>
        
        <div className="space-y-2">
          <p className="text-muted-foreground">Live tracking</p>
          <p className="text-sm text-muted-foreground">
            Interactive map would be displayed here
          </p>
        </div>
      </div>

      {/* Floating route indicators */}
      <div className="absolute top-4 left-4 bg-white rounded-full p-2 shadow-lg">
        <MapPin className="w-4 h-4 text-green-500" />
      </div>
      <div className="absolute bottom-4 right-4 bg-white rounded-full p-2 shadow-lg">
        <Navigation className="w-4 h-4 text-red-500" />
      </div>
      
      {/* Route line simulation */}
      <div className="absolute top-8 left-8 bottom-8 right-8 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path
            d="M10,20 Q30,5 50,25 T90,15"
            stroke="rgb(59, 130, 246)"
            strokeWidth="2"
            fill="none"
            strokeDasharray="5,5"
            className="animate-pulse"
          />
        </svg>
      </div>
    </div>
  );
}