import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Star, Phone, MessageSquare, MapPin } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function DriverInfo() {
  const driver = {
    name: "Kasun Perera",
    rating: 4.8,
    totalRides: 847,
    carModel: "Toyota Axio",
    licensePlate: "CAR-2547",
    eta: "3 minutes",
    image: "https://images.unsplash.com/photo-1718434114814-a6eb91717c2c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBkcml2ZXIlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NTk0MjE5MDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  };

  return (
    <Card className="w-full max-w-md card-3d shadow-lg border-0 bg-white/90 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Driver Header */}
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Your driver is on the way</h3>
            <Badge variant="secondary">{driver.eta}</Badge>
          </div>

          {/* Driver Details */}
          <div className="flex items-center space-x-4">
            <ImageWithFallback
              src={driver.image}
              alt={driver.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <h4 className="font-medium">{driver.name}</h4>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm">{driver.rating}</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                {driver.totalRides} rides
              </p>
              <p className="text-sm text-muted-foreground">
                {driver.carModel} • {driver.licensePlate}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button variant="outline" size="sm" className="flex-1">
              <Phone className="w-4 h-4 mr-2" />
              Call
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              <MessageSquare className="w-4 h-4 mr-2" />
              Message
            </Button>
          </div>

          {/* Trip Progress */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="text-sm">Driver is 0.8 km away</span>
            </div>
            
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-primary h-2 rounded-full w-3/4 transition-all duration-300"></div>
            </div>
          </div>

          {/* Trip Details */}
          <div className="bg-muted/50 rounded-lg p-3 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Trip fare</span>
              <span className="font-medium text-primary">Rs. 450</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Estimated time</span>
              <span className="font-medium">12 min</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Distance</span>
              <span className="font-medium">5.2 km</span>
            </div>
          </div>

          {/* Cancel Button */}
          <Button variant="destructive" className="w-full" size="sm">
            Cancel Ride
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}