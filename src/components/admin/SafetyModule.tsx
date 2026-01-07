import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { 
  AlertTriangle, 
  Shield,
  MapPin,
  Phone,
  Clock,
  User,
  Car,
  Activity,
  CheckCircle,
  XCircle,
  Bell
} from "lucide-react";
import { Alert, AlertDescription } from "../ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

interface SOSAlert {
  id: string;
  tripId: string;
  passenger: string;
  driver: string;
  location: string;
  timestamp: string;
  status: "active" | "responding" | "resolved" | "false-alarm";
  priority: "critical" | "high" | "medium";
  description: string;
}

interface LiveTrip {
  id: string;
  passenger: string;
  driver: string;
  vehicleId: string;
  pickup: string;
  dropoff: string;
  currentLocation: string;
  status: "in-progress" | "delayed" | "on-time";
  eta: string;
  duration: string;
  safetyScore: number;
}

export function SafetyModule() {
  const [activeTab, setActiveTab] = useState("sos");

  const sosAlerts: SOSAlert[] = [
    {
      id: "SOS-001",
      tripId: "TR-5432",
      passenger: "Sarah Williams",
      driver: "James Brown",
      location: "Downtown - 5th Ave & Main St",
      timestamp: "2 min ago",
      status: "active",
      priority: "critical",
      description: "Passenger activated emergency SOS"
    },
    {
      id: "SOS-002",
      tripId: "TR-5428",
      passenger: "Mike Thompson",
      driver: "Lisa Anderson",
      location: "Airport Road - Mile 12",
      timestamp: "15 min ago",
      status: "responding",
      priority: "high",
      description: "Driver reported unusual behavior"
    },
    {
      id: "SOS-003",
      tripId: "TR-5401",
      passenger: "Emma Davis",
      driver: "Robert Wilson",
      location: "North District - Park Ave",
      timestamp: "1 hour ago",
      status: "resolved",
      priority: "medium",
      description: "Vehicle breakdown - assistance provided"
    },
  ];

  const liveTrips: LiveTrip[] = [
    {
      id: "TR-5445",
      passenger: "John Doe",
      driver: "Michael Smith",
      vehicleId: "V-123",
      pickup: "Downtown Mall",
      dropoff: "Airport Terminal 2",
      currentLocation: "Highway 101 - Exit 23",
      status: "on-time",
      eta: "15 min",
      duration: "12 min",
      safetyScore: 98
    },
    {
      id: "TR-5446",
      passenger: "Jane Cooper",
      driver: "Sarah Johnson",
      vehicleId: "V-087",
      pickup: "Central Station",
      dropoff: "University Campus",
      currentLocation: "Main Street - Block 5",
      status: "in-progress",
      eta: "8 min",
      duration: "5 min",
      safetyScore: 95
    },
    {
      id: "TR-5447",
      passenger: "Bob Martinez",
      driver: "David Lee",
      vehicleId: "V-201",
      pickup: "Shopping District",
      dropoff: "Residential Area",
      currentLocation: "Oak Avenue - Traffic",
      status: "delayed",
      eta: "22 min",
      duration: "18 min",
      safetyScore: 87
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-red-100 text-red-800 border-red-300";
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-300";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-red-100 text-red-800";
      case "responding":
        return "bg-orange-100 text-orange-800";
      case "resolved":
        return "bg-green-100 text-green-800";
      case "false-alarm":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTripStatusColor = (status: string) => {
    switch (status) {
      case "on-time":
        return "text-green-600";
      case "delayed":
        return "text-orange-600";
      case "in-progress":
        return "text-blue-600";
      default:
        return "text-gray-600";
    }
  };

  const getSafetyScoreColor = (score: number) => {
    if (score >= 95) return "text-green-600";
    if (score >= 85) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Safety Module</h2>
          <p className="text-gray-500 mt-1">Emergency response and trip monitoring</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Bell className="h-4 w-4" />
          Alert Settings
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active SOS Alerts</p>
                <p className="text-2xl font-bold text-red-600">
                  {sosAlerts.filter(a => a.status === "active").length}
                </p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Live Trips</p>
                <p className="text-2xl font-bold text-blue-600">{liveTrips.length}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Activity className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Resolved Today</p>
                <p className="text-2xl font-bold text-green-600">
                  {sosAlerts.filter(a => a.status === "resolved").length}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Safety Score</p>
                <p className="text-2xl font-bold text-gray-900">94.5</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Shield className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="sos">SOS Alerts</TabsTrigger>
          <TabsTrigger value="live-trips">Live Trip Monitoring</TabsTrigger>
        </TabsList>

        {/* SOS Alerts Tab */}
        <TabsContent value="sos" className="space-y-4">
          {sosAlerts.filter(a => a.status === "active").length > 0 && (
            <Alert className="border-red-300 bg-red-50">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">
                <strong>Critical Alert!</strong> You have {sosAlerts.filter(a => a.status === "active").length} active SOS alert(s) requiring immediate attention.
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-4">
            {sosAlerts.map((alert) => (
              <Card key={alert.id} className={`border-2 ${alert.status === "active" ? "border-red-300 shadow-lg" : ""}`}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-3">
                      <div className={`p-3 rounded-full ${
                        alert.status === "active" ? "bg-red-100" : 
                        alert.status === "responding" ? "bg-orange-100" : "bg-green-100"
                      }`}>
                        <AlertTriangle className={`h-6 w-6 ${
                          alert.status === "active" ? "text-red-600" : 
                          alert.status === "responding" ? "text-orange-600" : "text-green-600"
                        }`} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-lg">{alert.id}</h3>
                          <Badge className={getPriorityColor(alert.priority)}>
                            {alert.priority.toUpperCase()}
                          </Badge>
                          <Badge className={getStatusColor(alert.status)}>
                            {alert.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{alert.description}</p>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-gray-400" />
                            <span><strong>Passenger:</strong> {alert.passenger}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Car className="h-4 w-4 text-gray-400" />
                            <span><strong>Driver:</strong> {alert.driver}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-gray-400" />
                            <span>{alert.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-gray-400" />
                            <span>{alert.timestamp}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {alert.status === "active" && (
                    <div className="flex gap-2 mt-4 pt-4 border-t">
                      <Button variant="destructive" className="gap-2">
                        <Phone className="h-4 w-4" />
                        Call Emergency Services
                      </Button>
                      <Button variant="default" className="gap-2">
                        <Phone className="h-4 w-4" />
                        Contact Passenger
                      </Button>
                      <Button variant="default" className="gap-2">
                        <Phone className="h-4 w-4" />
                        Contact Driver
                      </Button>
                      <Button variant="outline">Mark as Responding</Button>
                    </div>
                  )}

                  {alert.status === "responding" && (
                    <div className="flex gap-2 mt-4 pt-4 border-t">
                      <Button variant="default" className="gap-2">
                        <CheckCircle className="h-4 w-4" />
                        Mark as Resolved
                      </Button>
                      <Button variant="outline" className="gap-2">
                        <XCircle className="h-4 w-4" />
                        Mark as False Alarm
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Live Trip Monitoring Tab */}
        <TabsContent value="live-trips" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Active Trips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {liveTrips.map((trip) => (
                  <div key={trip.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold">{trip.id}</h3>
                          <Badge className={getTripStatusColor(trip.status)}>
                            {trip.status}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm mb-2">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-gray-400" />
                            <span>{trip.passenger}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Car className="h-4 w-4 text-gray-400" />
                            <span>{trip.driver} ({trip.vehicleId})</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Safety Score</p>
                        <p className={`text-2xl font-bold ${getSafetyScoreColor(trip.safetyScore)}`}>
                          {trip.safetyScore}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm mb-3">
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-green-500 mt-0.5" />
                        <div>
                          <p className="text-gray-500">Pickup</p>
                          <p className="font-medium">{trip.pickup}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-blue-500 mt-0.5" />
                        <div>
                          <p className="text-gray-500">Current Location</p>
                          <p className="font-medium">{trip.currentLocation}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-red-500 mt-0.5" />
                        <div>
                          <p className="text-gray-500">Dropoff</p>
                          <p className="font-medium">{trip.dropoff}</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 p-3 bg-gray-50 rounded-lg text-sm">
                      <div>
                        <p className="text-gray-500">ETA</p>
                        <p className="font-semibold">{trip.eta}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Duration</p>
                        <p className="font-semibold">{trip.duration}</p>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-3">
                      <Button size="sm" variant="outline">
                        <MapPin className="h-4 w-4 mr-2" />
                        Track on Map
                      </Button>
                      <Button size="sm" variant="outline">
                        <Phone className="h-4 w-4 mr-2" />
                        Contact
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Map Placeholder */}
          <Card>
            <CardHeader>
              <CardTitle>Live Trip Tracking Map</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-br from-blue-50 to-purple-100 rounded-lg h-96 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                  <p className="text-gray-600 font-medium">Real-time Map Tracking</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Live vehicle locations with route visualization
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
