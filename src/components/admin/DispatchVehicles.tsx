import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { 
  Car, 
  MapPin, 
  User, 
  Clock,
  Navigation,
  AlertCircle,
  CheckCircle
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface Vehicle {
  id: string;
  driver: string;
  location: string;
  status: "available" | "on-trip" | "offline";
  vehicleType: string;
  currentTrip?: string;
  rating: number;
}

interface RideRequest {
  id: string;
  passenger: string;
  pickup: string;
  dropoff: string;
  requestTime: string;
  status: "pending" | "assigned" | "completed";
}

export function DispatchVehicles() {
  const [filterStatus, setFilterStatus] = useState<string>("all");
  
  const vehicles: Vehicle[] = [
    {
      id: "V001",
      driver: "John Smith",
      location: "Downtown",
      status: "available",
      vehicleType: "Sedan",
      rating: 4.8
    },
    {
      id: "V002",
      driver: "Sarah Johnson",
      location: "Airport",
      status: "on-trip",
      vehicleType: "SUV",
      currentTrip: "TR-1234",
      rating: 4.9
    },
    {
      id: "V003",
      driver: "Mike Davis",
      location: "North District",
      status: "available",
      vehicleType: "Sedan",
      rating: 4.7
    },
    {
      id: "V004",
      driver: "Emily Brown",
      location: "Shopping Mall",
      status: "offline",
      vehicleType: "Luxury",
      rating: 4.9
    },
  ];

  const rideRequests: RideRequest[] = [
    {
      id: "RR-001",
      passenger: "Alice Cooper",
      pickup: "123 Main St",
      dropoff: "456 Oak Ave",
      requestTime: "2 min ago",
      status: "pending"
    },
    {
      id: "RR-002",
      passenger: "Bob Wilson",
      pickup: "789 Pine Rd",
      dropoff: "321 Elm St",
      requestTime: "5 min ago",
      status: "pending"
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800";
      case "on-trip":
        return "bg-blue-100 text-blue-800";
      case "offline":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredVehicles = filterStatus === "all" 
    ? vehicles 
    : vehicles.filter(v => v.status === filterStatus);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Dispatch & Vehicle Allocation</h2>
          <p className="text-gray-500 mt-1">Real-time vehicle tracking and dispatch management</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Available</p>
                <p className="text-2xl font-bold text-green-600">
                  {vehicles.filter(v => v.status === "available").length}
                </p>
              </div>
              <Car className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">On Trip</p>
                <p className="text-2xl font-bold text-blue-600">
                  {vehicles.filter(v => v.status === "on-trip").length}
                </p>
              </div>
              <Navigation className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Offline</p>
                <p className="text-2xl font-bold text-gray-600">
                  {vehicles.filter(v => v.status === "offline").length}
                </p>
              </div>
              <AlertCircle className="h-8 w-8 text-gray-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Requests</p>
                <p className="text-2xl font-bold text-orange-600">
                  {rideRequests.filter(r => r.status === "pending").length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Pending Ride Requests */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Pending Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {rideRequests.map((request) => (
                <div key={request.id} className="border rounded-lg p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm">{request.id}</span>
                    <Badge variant="outline" className="text-xs">
                      {request.requestTime}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-start gap-2 text-sm">
                      <User className="h-4 w-4 text-gray-400 mt-0.5" />
                      <span>{request.passenger}</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-gray-600">
                      <MapPin className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>{request.pickup}</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-gray-600">
                      <MapPin className="h-4 w-4 text-red-500 mt-0.5" />
                      <span>{request.dropoff}</span>
                    </div>
                  </div>
                  <Button className="w-full" size="sm">
                    Assign Driver
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Vehicle List */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Car className="h-5 w-5" />
                Active Vehicles
              </CardTitle>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="on-trip">On Trip</SelectItem>
                  <SelectItem value="offline">Offline</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredVehicles.map((vehicle) => (
                <div key={vehicle.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-full">
                        <Car className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-semibold">{vehicle.driver}</p>
                        <p className="text-sm text-gray-500">{vehicle.id} • {vehicle.vehicleType}</p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(vehicle.status)}>
                      {vehicle.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span>{vehicle.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-500" />
                      <span>Rating: {vehicle.rating}</span>
                    </div>
                  </div>
                  {vehicle.currentTrip && (
                    <div className="mt-2 p-2 bg-blue-50 rounded text-sm">
                      Current Trip: {vehicle.currentTrip}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Map Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>Real-time Vehicle Map</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg h-96 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-16 w-16 text-blue-600 mx-auto mb-4" />
              <p className="text-gray-600 font-medium">Live Map Integration</p>
              <p className="text-sm text-gray-500 mt-2">
                Real-time vehicle tracking with Google Maps / Mapbox
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
