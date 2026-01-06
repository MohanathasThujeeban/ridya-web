import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DriverInfo } from "./DriverInfo";
import { MapPlaceholder } from "./MapPlaceholder";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { 
  MapPin, 
  DollarSign, 
  Clock, 
  Star, 
  Navigation,
  Power,
  Bell,
  Settings,
  User,
  Car,
  Menu
} from "lucide-react";
import rideyaLogo from "figma:asset/6e7f4dbeb5a4a8f55405b8ef99dd0323b83f0292.png";

export function DriverDashboard() {
  const navigate = useNavigate();
  const [isOnline, setIsOnline] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [todayTrips] = useState(0);
  const [todayEarnings] = useState(0);

  useEffect(() => {
    // Check if user is logged in and is a driver
    const userRole = localStorage.getItem('userRole');
    const storedUserData = localStorage.getItem('userData');
    
    if (userRole !== 'DRIVER') {
      navigate('/');
      return;
    }
    
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userData');
    navigate('/');
  };

  const toggleOnlineStatus = () => {
    setIsOnline(!isOnline);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Custom Driver Header */}
      <header className="relative w-full header-3d border-b border-border/20 sticky top-0 z-[100] bg-white/95 backdrop-blur-lg">
        <div className="relative w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-xl p-1.5 md:p-2 shadow-lg border border-primary/20">
                <img 
                  src={rideyaLogo} 
                  alt="RIDEYA" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h1 className="text-lg md:text-xl font-bold text-3d">RIDEYA</h1>
                <Badge className={isOnline ? 'bg-green-500' : 'bg-gray-400'}>
                  <Car className="w-3 h-3 mr-1" />
                  Driver {isOnline ? 'Online' : 'Offline'}
                </Badge>
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" className="hidden md:flex">
                <Bell className="w-5 h-5" />
              </Button>
              <Button 
                variant={isOnline ? "default" : "outline"}
                onClick={toggleOnlineStatus}
                className="hidden md:flex"
              >
                <Power className="w-4 h-4 mr-2" />
                {isOnline ? 'Go Offline' : 'Go Online'}
              </Button>
              <Button variant="outline" size="icon">
                <Menu className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Top Status Bar */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-1">
              Welcome, {userData?.firstName || 'Driver'}!
            </h1>
            <p className="text-muted-foreground">
              {isOnline ? 'You are online and ready for rides' : 'You are offline'}
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon">
              <Bell className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="icon">
              <Settings className="w-5 h-5" />
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>

        {/* Online/Offline Toggle */}
        <Card className="p-6 mb-6 bg-gradient-to-r from-primary to-accent text-white card-3d">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                isOnline ? 'bg-green-500' : 'bg-gray-400'
              }`}>
                <Power className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold">
                  {isOnline ? 'You are Online' : 'You are Offline'}
                </h2>
                <p className="text-white/80">
                  {isOnline ? 'Ready to accept ride requests' : 'Toggle to start accepting rides'}
                </p>
              </div>
            </div>
            
            <Button 
              size="lg"
              variant={isOnline ? "secondary" : "default"}
              onClick={toggleOnlineStatus}
              className="px-8"
            >
              {isOnline ? 'Go Offline' : 'Go Online'}
            </Button>
          </div>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="p-4 card-3d">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Today's Trips</p>
                <p className="text-2xl font-bold">{todayTrips}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 card-3d">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Today's Earnings</p>
                <p className="text-2xl font-bold">LKR {todayEarnings}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 card-3d">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Rating</p>
                <p className="text-2xl font-bold">5.0</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 card-3d">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Online Time</p>
                <p className="text-2xl font-bold">0h</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map Section */}
          <div className="lg:col-span-2">
            <Card className="p-4 card-3d">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Navigation className="w-5 h-5 text-primary" />
                Your Location
              </h3>
              <MapPlaceholder />
              
              {!isOnline && (
                <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    💡 Go online to start receiving ride requests nearby
                  </p>
                </div>
              )}

              {isOnline && (
                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-800 font-medium">
                    ✅ You're online and ready! Waiting for ride requests...
                  </p>
                </div>
              )}
            </Card>
          </div>

          {/* Driver Info & Status */}
          <div className="lg:col-span-1">
            <DriverInfo />
            
            {/* Quick Actions */}
            <Card className="p-4 mt-6 card-3d">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <User className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <DollarSign className="w-4 h-4 mr-2" />
                  Earnings History
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Star className="w-4 h-4 mr-2" />
                  My Ratings
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
