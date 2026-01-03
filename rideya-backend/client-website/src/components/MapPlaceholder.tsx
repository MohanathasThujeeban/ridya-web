import { useEffect, useRef } from "react";
import { MapPin, Navigation } from "lucide-react";

// This component will try to load Google Maps when a Vite env var is present:
// VITE_GOOGLE_MAPS_API_KEY. If the key is not set the original placeholder UI
// is shown so the app still works without the API key.
export function MapPlaceholder() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const apiKey = (import.meta as any).env?.VITE_GOOGLE_MAPS_API_KEY as string | undefined;
  
  console.log('MapPlaceholder: API Key present:', !!apiKey);
  console.log('MapPlaceholder: API Key value:', apiKey);

  useEffect(() => {
    if (!apiKey) {
      console.log('MapPlaceholder: No API key, showing placeholder');
      return; // nothing to do when key is absent
    }

    console.log('MapPlaceholder: Initializing Google Maps...');

    // If the Google Maps script is already present, initialize immediately.
    if ((window as any).google && (window as any).google.maps) {
      console.log('MapPlaceholder: Google Maps already loaded, initializing...');
      initMap();
      return;
    }

    // Check if script is already loading or loaded
    const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');
    if (existingScript) {
      console.log('MapPlaceholder: Google Maps script already exists');
      return;
    }

    // Dynamically inject the Google Maps JS API script
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initMap`;
    script.async = true;
    script.defer = true;
    
    // Make initMap globally available
    (window as any).initMap = initMap;
    
    script.onerror = (error) => {
      console.error('MapPlaceholder: Failed to load Google Maps script:', error);
    };

    console.log('MapPlaceholder: Loading Google Maps script...');
    document.head.appendChild(script);

    return () => {
      // Clean up: remove injected script (safe no-op if already removed)
      if (script.parentNode) script.parentNode.removeChild(script);
    };

    function initMap() {
      if (!mapRef.current) {
        console.log('MapPlaceholder: mapRef.current is null');
        return;
      }
      
      console.log('MapPlaceholder: Initializing map in element:', mapRef.current);
      const google = (window as any).google;
      
      try {
        const map = new google.maps.Map(mapRef.current, {
          center: { lat: 6.9271, lng: 79.8612 }, // Colombo, Sri Lanka
          zoom: 13,
          disableDefaultUI: false, // Enable default UI for better visibility
          mapTypeControl: true,
          streetViewControl: true,
          fullscreenControl: true,
        });

        console.log('MapPlaceholder: Map created successfully');

        // Example marker at center
        new google.maps.Marker({ 
          position: { lat: 6.9271, lng: 79.8612 }, 
          map,
          title: 'RIDEYA Location'
        });
        
        console.log('MapPlaceholder: Marker added');
      } catch (e) {
        console.error('MapPlaceholder: Error initializing map:', e);
      }
    }
  }, [apiKey]);

  // If no API key is configured, render the friendly placeholder UI
  if (!apiKey) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-blue-50 to-green-50 rounded-lg flex flex-col items-center justify-center relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-8 grid-rows-8 h-full w-full">
            {Array.from({ length: 64 }).map((_, i) => (
              <div key={i} className="border border-gray-400" />
            ))}
          </div>
        </div>

        {/* Map content (placeholder) */}
        <div className="relative z-10 text-center space-y-4">
          <div className="flex items-center justify-center space-x-4">
            <div className="bg-green-500 p-3 rounded-full shadow-lg animate-pulse">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <div className="h-px w-16 bg-gray-400 relative">
              <div className="absolute top-0 left-0 h-px bg-primary w-full animate-pulse" />
            </div>
            <div className="bg-red-500 p-3 rounded-full shadow-lg">
              <Navigation className="w-6 h-6 text-white" />
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-muted-foreground">Live tracking</p>
            <p className="text-sm text-muted-foreground">Interactive map would be displayed here</p>
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
            <path d="M10,20 Q30,5 50,25 T90,15" stroke="rgb(59, 130, 246)" strokeWidth="2" fill="none" strokeDasharray="5,5" className="animate-pulse" />
          </svg>
        </div>
      </div>
    );
  }

  // When API key is present, render the map container and keep small UI elements
  return (
    <div className="w-full h-full rounded-lg relative overflow-hidden bg-slate-50">
      {/* Map container (will be replaced by Google Maps when script initializes) */}
      <div 
        ref={mapRef} 
        className="w-full h-full" 
        style={{ 
          minHeight: '400px', 
          height: '100%',
          width: '100%'
        }} 
      />

      {/* Small floating controls/indicators on top of map */}
      <div className="absolute top-4 left-4 bg-white rounded-full p-2 shadow-lg z-10">
        <MapPin className="w-4 h-4 text-green-500" />
      </div>
      <div className="absolute bottom-4 right-4 bg-white rounded-full p-2 shadow-lg z-10">
        <Navigation className="w-4 h-4 text-red-500" />
      </div>
    </div>
  );
}