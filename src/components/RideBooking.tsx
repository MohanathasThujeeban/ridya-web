import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent } from "./ui/card";
import { MapPin, Navigation, Calendar, Clock, Loader2 } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface RideBookingProps {
  onBookingComplete?: () => void;
}

export function RideBooking({ onBookingComplete }: RideBookingProps) {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState("car");
  const [isBooking, setIsBooking] = useState(false);

  const vehicleTypes = [
    {
      id: "bike",
      name: "RideyaBike",
      description: "Quick & eco-friendly bike rides",
      price: "Rs. 150",
      eta: "2 min",
      passengers: "1 rider",
      icon: "🏍️"
    },
    {
      id: "wheel",
      name: "RideyaWheel",
      description: "Comfortable tuk-tuk rides",
      price: "Rs. 250",
      eta: "3 min",
      passengers: "1-3 people",
      icon: "🛺"
    },
    {
      id: "car",
      name: "RideyaCar",
      description: "Standard car for daily commutes",
      price: "Rs. 450",
      eta: "4 min",
      passengers: "1-4 people",
      icon: "🚗"
    },
    {
      id: "xl",
      name: "RideyaXL",
      description: "Spacious vehicles for groups",
      price: "Rs. 650",
      eta: "5 min",
      passengers: "1-7 people",
      icon: "🚐"
    }
  ];

  return (
    <div className="w-full max-w-md">
      <Card className="card-3d shadow-lg border-0 bg-white/90 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Location Inputs */}
            <div className="space-y-3">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Pickup location"
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="relative">
                <Navigation className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Where to?"
                  value={dropoff}
                  onChange={(e) => setDropoff(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Schedule Options */}
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="flex-1">
                <Clock className="w-4 h-4 mr-2" />
                Now
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule
              </Button>
            </div>

            {/* Vehicle Selection */}
            <div className="space-y-3">
              <h3 className="font-medium">Choose your ride</h3>
              <div className="space-y-2">
                {vehicleTypes.map((vehicle) => (
                  <Card
                    key={vehicle.id}
                    className={`cursor-pointer transition-all card-3d ripple hover:scale-102 ${
                      selectedVehicle === vehicle.id
                        ? "ring-2 ring-primary bg-primary/5 border-primary/30 scale-in"
                        : "hover:bg-muted/50 border-border/20"
                    }`}
                    onClick={() => setSelectedVehicle(vehicle.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg flex items-center justify-center text-2xl">
                            {vehicle.icon}
                          </div>
                          <div>
                            <p className="font-semibold text-foreground">{vehicle.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {vehicle.description}
                            </p>
                            <p className="text-xs text-primary font-medium">
                              {vehicle.passengers}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg text-primary">{vehicle.price}</p>
                          <p className="text-sm text-muted-foreground">
                            {vehicle.eta} away
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Book Ride Button */}
            <Button 
              className="w-full button-3d gradient-3d border-0 text-white ripple" 
              size="lg"
              disabled={isBooking || !pickup || !dropoff}
              onClick={async () => {
                setIsBooking(true);
                // Simulate booking process
                await new Promise(resolve => setTimeout(resolve, 2000));
                setIsBooking(false);
                onBookingComplete?.();
              }}
            >
              {isBooking ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Finding Driver...
                </>
              ) : (
                <>
                  Book Ride
                  <Navigation className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}