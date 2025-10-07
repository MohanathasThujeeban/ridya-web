import { useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { 
  Menu, X, Bell, User, Settings, Car, 
  DollarSign, Phone, Mail, RotateCcw 
} from "lucide-react";
import rideyaLogo from "figma:asset/6e7f4dbeb5a4a8f55405b8ef99dd0323b83f0292.png";

interface DriverHeaderProps {
  isOnline: boolean;
  onToggleOnline: () => void;
  onSwitchToClient: () => void;
  earnings: string;
  trips: number;
}

export function DriverHeader({ 
  isOnline, 
  onToggleOnline, 
  onSwitchToClient, 
  earnings, 
  trips 
}: DriverHeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="relative w-full header-3d border-b border-border/20 sticky top-0 z-[100]">
      <div className="relative w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo Section */}
          <div className="flex items-center space-x-2 md:space-x-3 header-logo-touch flex-shrink-0">
            <div className="relative w-10 h-10 md:w-12 md:h-12 bg-white rounded-xl p-1.5 md:p-2 shadow-lg border border-primary/20 touch-feedback">
              <img 
                src={rideyaLogo} 
                alt="RIDEYA" 
                className="w-full h-full object-contain filter brightness-110 contrast-110"
                style={{ 
                  filter: 'brightness(1.1) contrast(1.1)',
                  mixBlendMode: 'multiply'
                }}
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold logo-text">
                RIDEYA
              </h1>
              <p className="text-xs text-muted-foreground font-medium">Driver Dashboard • Sri Lanka</p>
            </div>
          </div>

          {/* Driver Status & Stats - Desktop */}
          <div className="hidden lg:flex items-center space-x-6">
            {/* Online Status */}
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-500' : 'bg-gray-400'} animate-pulse`}></div>
              <Badge variant={isOnline ? "default" : "secondary"} className="px-3 py-1">
                {isOnline ? "ONLINE" : "OFFLINE"}
              </Badge>
            </div>

            {/* Quick Stats */}
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <DollarSign className="w-4 h-4 text-primary" />
                <span className="font-semibold">{earnings}</span>
                <span className="text-muted-foreground">today</span>
              </div>
              <div className="flex items-center space-x-1">
                <Car className="w-4 h-4 text-blue-600" />
                <span className="font-semibold">{trips}</span>
                <span className="text-muted-foreground">trips</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2 md:space-x-3">
            {/* Driver Actions */}
            <div className="flex items-center space-x-1 md:space-x-2">
              {/* Notifications */}
              <Button variant="ghost" size="icon" className="relative header-button-touch w-8 h-8 md:w-10 md:h-10">
                <Bell className="w-3 h-3 md:w-4 md:h-4" />
                <span className="absolute -top-1 -right-1 w-2 h-2 md:w-3 md:h-3 bg-red-500 rounded-full text-xs"></span>
              </Button>
              
              {/* Switch to Client Mode */}
              <Button 
                variant="outline" 
                size="sm" 
                className="hidden md:flex header-button-touch text-xs md:text-sm px-2 md:px-3 border-blue-300 text-blue-600 hover:bg-blue-50"
                onClick={onSwitchToClient}
              >
                <RotateCcw className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                Switch to Client
              </Button>
              
              {/* Go Online/Offline Toggle */}
              <Button 
                size="sm" 
                className={`header-button-touch text-xs md:text-sm px-2 md:px-3 ${
                  isOnline 
                    ? 'bg-red-600 hover:bg-red-700 text-white' 
                    : 'button-3d gradient-3d border-0 text-white shadow-lg'
                }`}
                onClick={onToggleOnline}
              >
                {isOnline ? 'Go Offline' : 'Go Online'}
              </Button>

              {/* Mobile Menu Button */}
              <Button 
                variant="ghost" 
                size="icon" 
                className="lg:hidden header-button-touch w-8 h-8 md:w-10 md:h-10"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-4 h-4 md:w-5 md:h-5" /> : <Menu className="w-4 h-4 md:w-5 md:h-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-background/98 backdrop-blur-lg border-t border-border/20 card-3d z-50">
            <div className="p-4 space-y-4">
              {/* Driver Status - Mobile */}
              <div className="bg-muted/30 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-foreground">Driver Status</h4>
                  <Badge variant={isOnline ? "default" : "secondary"} className="px-3 py-1">
                    {isOnline ? "ONLINE" : "OFFLINE"}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-4 h-4 text-primary" />
                    <div>
                      <p className="font-semibold">{earnings}</p>
                      <p className="text-xs text-muted-foreground">Today's Earnings</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Car className="w-4 h-4 text-blue-600" />
                    <div>
                      <p className="font-semibold">{trips} trips</p>
                      <p className="text-xs text-muted-foreground">Completed</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile Action Buttons */}
              <div className="flex flex-col space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full header-button-touch border-blue-300 text-blue-600 hover:bg-blue-50"
                  onClick={() => {
                    onSwitchToClient();
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Switch to Client Mode
                </Button>
                <Button 
                  className={`w-full header-button-touch ${
                    isOnline 
                      ? 'bg-red-600 hover:bg-red-700 text-white' 
                      : 'button-3d gradient-3d border-0 text-white'
                  }`}
                  onClick={() => {
                    onToggleOnline();
                    setIsMobileMenuOpen(false);
                  }}
                >
                  {isOnline ? 'Go Offline' : 'Go Online'}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}