import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { User, Car, ArrowRight, MapPin, DollarSign, Star, Clock } from "lucide-react";

interface UserModeSelectorProps {
  currentMode: 'client' | 'driver';
  onModeChange: (mode: 'client' | 'driver') => void;
}

export function UserModeSelector({ currentMode, onModeChange }: UserModeSelectorProps) {
  const [selectedMode, setSelectedMode] = useState<'client' | 'driver'>(currentMode);

  const handleModeSelect = (mode: 'client' | 'driver') => {
    setSelectedMode(mode);
    onModeChange(mode);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-3d">Welcome to RIDEYA</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Choose how you'd like to use RIDEYA today - book a ride or start driving to earn money
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* Client Mode */}
        <Card 
          className={`card-3d cursor-pointer transition-all duration-300 hover:scale-105 ${
            selectedMode === 'client' 
              ? 'ring-2 ring-primary border-primary/30 bg-primary/5' 
              : 'hover:border-primary/20'
          }`}
          onClick={() => handleModeSelect('client')}
        >
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <User className="w-10 h-10 text-white" />
            </div>
            
            <h2 className="text-2xl font-bold mb-3">Book a Ride</h2>
            <p className="text-muted-foreground mb-6">
              Need to go somewhere? Book a ride with RIDEYA and get there safely and comfortably.
            </p>

            {selectedMode === 'client' && (
              <Badge className="mb-4 bg-blue-500 text-white">Selected</Badge>
            )}
          </CardContent>
        </Card>

        {/* Driver Mode */}
        <Card 
          className={`card-3d cursor-pointer transition-all duration-300 hover:scale-105 ${
            selectedMode === 'driver' 
              ? 'ring-2 ring-primary border-primary/30 bg-primary/5' 
              : 'hover:border-primary/20'
          }`}
          onClick={() => handleModeSelect('driver')}
        >
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Car className="w-10 h-10 text-white" />
            </div>
            
            <h2 className="text-2xl font-bold mb-3">Drive & Earn</h2>
            <p className="text-muted-foreground mb-6">
              Have a vehicle? Join RIDEYA as a driver and start earning money on your own schedule.
            </p>

            {selectedMode === 'driver' && (
              <Badge className="mb-4 bg-primary text-white">Selected</Badge>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Continue Button */}
      <div className="text-center">
        <Button 
          size="lg" 
          className="button-3d gradient-3d border-0 text-white px-8 py-3 text-lg"
          onClick={() => onModeChange(selectedMode)}
        >
          {selectedMode === 'client' ? 'Start Booking Rides' : 'Start Driving & Earning'}
          <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}