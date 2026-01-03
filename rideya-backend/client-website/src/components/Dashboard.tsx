import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { useAuthStore } from "../store/authStore";
import { LogOut, User, MapPin } from "lucide-react";
import rideyaLogo from "figma:asset/6e7f4dbeb5a4a8f55405b8ef99dd0323b83f0292.png";

export function Dashboard() {
  const navigate = useNavigate();
  const { user, clearAuth } = useAuthStore();

  const handleLogout = () => {
    clearAuth();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-lg border-b border-primary/10 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-lg p-1.5 shadow-md border border-primary/20">
              <img 
                src={rideyaLogo} 
                alt="RIDEYA" 
                className="w-full h-full object-contain"
              />
            </div>
            <h1 className="text-2xl font-bold text-foreground">RIDEYA</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-foreground">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, {user?.firstName}! 👋
          </h2>
          <p className="text-muted-foreground">
            Your dashboard is ready. Start booking rides or manage your account.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/')}>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Book a Ride</h3>
                <p className="text-sm text-muted-foreground">
                  Find and book your next ride
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                <User className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">My Profile</h3>
                <p className="text-sm text-muted-foreground">
                  Update your account details
                </p>
              </div>
            </div>
          </Card>

          {/* User Info Card */}
          <Card className="p-6 md:col-span-2 lg:col-span-1">
            <h3 className="font-semibold text-lg mb-4">Account Information</h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-muted-foreground">Full Name</p>
                <p className="text-sm font-medium">{user?.firstName} {user?.lastName}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Email</p>
                <p className="text-sm font-medium">{user?.email}</p>
              </div>
              {user?.phone && (
                <div>
                  <p className="text-xs text-muted-foreground">Phone</p>
                  <p className="text-sm font-medium">{user.phone}</p>
                </div>
              )}
              <div>
                <p className="text-xs text-muted-foreground">Account Type</p>
                <p className="text-sm font-medium capitalize">{user?.role || 'Rider'}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Activity Placeholder */}
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">No recent rides yet</p>
            <Button className="mt-4" onClick={() => navigate('/')}>
              Book Your First Ride
            </Button>
          </Card>
        </div>
      </main>
    </div>
  );
}
