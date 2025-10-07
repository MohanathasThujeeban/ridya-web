import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Switch } from "./ui/switch";
import { 
  Car, 
  MapPin, 
  Clock, 
  DollarSign, 
  Star, 
  Navigation, 
  Phone, 
  MessageCircle, 
  User,
  TrendingUp,
  Calendar,
  Settings,
  FileText,
  Route,
  Fuel,
  Shield
} from "lucide-react";

interface Trip {
  id: string;
  passenger: string;
  pickup: string;
  destination: string;
  distance: string;
  fare: string;
  status: 'incoming' | 'accepted' | 'ongoing' | 'completed';
  rating?: number;
  time: string;
}

export function DriverDashboard() {
  const [isOnline, setIsOnline] = useState(false);
  const [currentTrip, setCurrentTrip] = useState<Trip | null>(null);
  const [incomingTrip, setIncomingTrip] = useState<Trip | null>({
    id: "trip_001",
    passenger: "Priya Perera",
    pickup: "Colombo Fort Railway Station",
    destination: "Bandaranaike International Airport",
    distance: "32.5 km",
    fare: "Rs. 2,450",
    status: 'incoming',
    time: "2 min away"
  });

  const todayStats = {
    earnings: "Rs. 8,750",
    trips: 12,
    hours: "7.5",
    rating: 4.8
  };

  const recentTrips: Trip[] = [
    {
      id: "trip_002",
      passenger: "Kasun Silva",
      pickup: "Galle Face Green",
      destination: "Colombo City Centre",
      distance: "5.2 km",
      fare: "Rs. 450",
      status: 'completed',
      rating: 5,
      time: "1h ago"
    },
    {
      id: "trip_003",
      passenger: "Nimal Fernando",
      pickup: "Independence Square",
      destination: "Mount Lavinia Beach",
      distance: "12.8 km",
      fare: "Rs. 850",
      status: 'completed',
      rating: 4,
      time: "2h ago"
    }
  ];

  const acceptTrip = () => {
    if (incomingTrip) {
      setCurrentTrip({ ...incomingTrip, status: 'accepted' });
      setIncomingTrip(null);
    }
  };

  const declineTrip = () => {
    setIncomingTrip(null);
  };

  const startTrip = () => {
    if (currentTrip) {
      setCurrentTrip({ ...currentTrip, status: 'ongoing' });
    }
  };

  const completeTrip = () => {
    if (currentTrip) {
      setCurrentTrip(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Driver Status Header */}
      <div className="mb-8 card-3d bg-white rounded-2xl p-6 border border-border/20">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white ${isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-3d">Chaminda Rathnayake</h1>
              <p className="text-sm text-muted-foreground">RIDEYA Driver • Toyota Axio • CAR-2547</p>
              <div className="flex items-center space-x-2 mt-1">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="text-sm font-medium">4.8 (247 trips)</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">Go Online</span>
              <Switch
                checked={isOnline}
                onCheckedChange={setIsOnline}
                className="data-[state=checked]:bg-primary"
              />
            </div>
            <Badge variant={isOnline ? "default" : "secondary"} className="px-3 py-1">
              {isOnline ? "ONLINE" : "OFFLINE"}
            </Badge>
          </div>
        </div>
      </div>

      {/* Incoming Trip Request */}
      {incomingTrip && (
        <div className="mb-8 card-3d bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-6 border-2 border-green-200 animate-pulse">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-green-800">New Trip Request!</h2>
            <Badge className="bg-green-500 text-white">Incoming</Badge>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5 text-green-600" />
                <span className="font-medium">{incomingTrip.passenger}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-green-600" />
                <span className="text-sm">{incomingTrip.pickup}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Navigation className="w-5 h-5 text-green-600" />
                <span className="text-sm">{incomingTrip.destination}</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Route className="w-5 h-5 text-green-600" />
                <span className="font-medium">{incomingTrip.distance}</span>
              </div>
              <div className="flex items-center space-x-2">
                <DollarSign className="w-5 h-5 text-green-600" />
                <span className="font-bold text-lg text-green-700">{incomingTrip.fare}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-green-600" />
                <span className="text-sm">{incomingTrip.time}</span>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <Button 
              className="flex-1 bg-green-600 hover:bg-green-700 text-white"
              onClick={acceptTrip}
            >
              Accept Trip
            </Button>
            <Button 
              variant="outline" 
              className="flex-1 border-red-300 text-red-600 hover:bg-red-50"
              onClick={declineTrip}
            >
              Decline
            </Button>
          </div>
        </div>
      )}

      {/* Current Trip */}
      {currentTrip && (
        <div className="mb-8 card-3d bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-6 border-2 border-blue-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-blue-800">Current Trip</h2>
            <Badge className="bg-blue-500 text-white">
              {currentTrip.status === 'accepted' ? 'Accepted' : 'Ongoing'}
            </Badge>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5 text-blue-600" />
                <span className="font-medium">{currentTrip.passenger}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                <span className="text-sm">{currentTrip.pickup}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Navigation className="w-5 h-5 text-blue-600" />
                <span className="text-sm">{currentTrip.destination}</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Route className="w-5 h-5 text-blue-600" />
                <span className="font-medium">{currentTrip.distance}</span>
              </div>
              <div className="flex items-center space-x-2">
                <DollarSign className="w-5 h-5 text-blue-600" />
                <span className="font-bold text-lg text-blue-700">{currentTrip.fare}</span>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <Button 
              variant="outline" 
              className="flex-1 border-blue-300"
            >
              <Phone className="w-4 h-4 mr-2" />
              Call Passenger
            </Button>
            <Button 
              variant="outline" 
              className="flex-1 border-blue-300"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Message
            </Button>
            {currentTrip.status === 'accepted' ? (
              <Button 
                className="flex-1 bg-blue-600 hover:bg-blue-700"
                onClick={startTrip}
              >
                Start Trip
              </Button>
            ) : (
              <Button 
                className="flex-1 bg-green-600 hover:bg-green-700"
                onClick={completeTrip}
              >
                Complete Trip
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Dashboard Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="trips">Trips</TabsTrigger>
          <TabsTrigger value="earnings">Earnings</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Today's Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="card-3d">
              <CardContent className="p-6 text-center">
                <DollarSign className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold text-primary">{todayStats.earnings}</p>
                <p className="text-sm text-muted-foreground">Today's Earnings</p>
              </CardContent>
            </Card>
            
            <Card className="card-3d">
              <CardContent className="p-6 text-center">
                <Car className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-blue-600">{todayStats.trips}</p>
                <p className="text-sm text-muted-foreground">Completed Trips</p>
              </CardContent>
            </Card>
            
            <Card className="card-3d">
              <CardContent className="p-6 text-center">
                <Clock className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-green-600">{todayStats.hours}</p>
                <p className="text-sm text-muted-foreground">Hours Online</p>
              </CardContent>
            </Card>
            
            <Card className="card-3d">
              <CardContent className="p-6 text-center">
                <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-yellow-600">{todayStats.rating}</p>
                <p className="text-sm text-muted-foreground">Average Rating</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Trips Tab */}
        <TabsContent value="trips" className="space-y-6">
          <Card className="card-3d">
            <CardHeader>
              <CardTitle>Recent Trips</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTrips.map((trip) => (
                  <div key={trip.id} className="border border-border/20 rounded-lg p-4 hover:bg-muted/20 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">{trip.passenger}</span>
                        {trip.rating && (
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="text-sm">{trip.rating}</span>
                          </div>
                        )}
                      </div>
                      <span className="text-sm text-muted-foreground">{trip.time}</span>
                    </div>
                    <div className="grid md:grid-cols-3 gap-2 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3" />
                        <span className="truncate">{trip.pickup}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Navigation className="w-3 h-3" />
                        <span className="truncate">{trip.destination}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>{trip.distance}</span>
                        <span className="font-bold text-primary">{trip.fare}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Earnings Tab */}
        <TabsContent value="earnings" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="card-3d">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <span>This Week</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Total Earnings</span>
                    <span className="font-bold text-primary">Rs. 45,250</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Trips</span>
                    <span className="font-medium">67</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Average per Trip</span>
                    <span className="font-medium">Rs. 675</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-3d">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  <span>This Month</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Total Earnings</span>
                    <span className="font-bold text-primary">Rs. 187,500</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Trips</span>
                    <span className="font-medium">285</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Net Earnings</span>
                    <span className="font-bold text-green-600">Rs. 168,750</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <Card className="card-3d">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="w-5 h-5 text-primary" />
                <span>Driver Profile</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Full Name</label>
                    <p className="text-muted-foreground">Chaminda Rathnayake</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Phone Number</label>
                    <p className="text-muted-foreground">+94 77 123 4567</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Vehicle Model</label>
                    <p className="text-muted-foreground">Toyota Axio 2019</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Vehicle Number</label>
                    <p className="text-muted-foreground">CAR-2547</p>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <Button className="w-full md:w-auto">
                    <Settings className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}