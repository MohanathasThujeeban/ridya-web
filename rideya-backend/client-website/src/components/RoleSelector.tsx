import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { User, Car, ArrowRight, ArrowLeft, MapPin, DollarSign, Star, Clock, Shield } from "lucide-react";
import rideyaLogo from "figma:asset/6e7f4dbeb5a4a8f55405b8ef99dd0323b83f0292.png";

type UserRole = 'PASSENGER' | 'DRIVER';

interface RoleSelectorProps {
  onRoleSelect: (role: UserRole) => void;
}

export function RoleSelector({ onRoleSelect }: RoleSelectorProps) {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

  const handleContinue = () => {
    if (selectedRole) {
      onRoleSelect(selectedRole);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-xl floating-3d"></div>
        <div className="absolute -bottom-8 right-20 w-32 h-32 bg-gradient-to-br from-accent/15 to-primary/15 rounded-full blur-2xl floating-3d" style={{ animationDelay: '-2s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-lg floating-3d" style={{ animationDelay: '-4s' }}></div>
      </div>

      <div className="w-full max-w-4xl relative">
        {/* Back Button */}
        <Button
          variant="ghost"
          size="sm"
          className="mb-6 touch-feedback"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <div className="text-center mb-8">
          {/* Logo */}
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-white rounded-xl p-2 shadow-lg border border-primary/20">
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
          </div>
          <h1 className="text-4xl font-bold mb-4 text-3d">Welcome to RIDEYA</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose your role to get started
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Passenger Role */}
          <Card 
            className={`card-3d cursor-pointer transition-all duration-300 hover:scale-105 ${
              selectedRole === 'PASSENGER' 
                ? 'ring-2 ring-blue-500 border-blue-500/30 bg-blue-50/50' 
                : 'hover:border-primary/20'
            }`}
            onClick={() => setSelectedRole('PASSENGER')}
          >
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <User className="w-10 h-10 text-white" />
                </div>
                
                <h2 className="text-2xl font-bold mb-2">I'm a Passenger</h2>
                <p className="text-muted-foreground mb-4">
                  Book rides and travel safely
                </p>

                {selectedRole === 'PASSENGER' && (
                  <Badge className="bg-blue-500 text-white">Selected</Badge>
                )}
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <MapPin className="w-4 h-4 text-blue-500" />
                  <span>Book rides anytime, anywhere</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Clock className="w-4 h-4 text-blue-500" />
                  <span>Real-time ride tracking</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Shield className="w-4 h-4 text-blue-500" />
                  <span>Safe and verified drivers</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Star className="w-4 h-4 text-blue-500" />
                  <span>Rate your experience</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Driver Role */}
          <Card 
            className={`card-3d cursor-pointer transition-all duration-300 hover:scale-105 ${
              selectedRole === 'DRIVER' 
                ? 'ring-2 ring-primary border-primary/30 bg-primary/5' 
                : 'hover:border-primary/20'
            }`}
            onClick={() => setSelectedRole('DRIVER')}
          >
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Car className="w-10 h-10 text-white" />
                </div>
                
                <h2 className="text-2xl font-bold mb-2">I'm a Driver</h2>
                <p className="text-muted-foreground mb-4">
                  Drive and earn on your schedule
                </p>

                {selectedRole === 'DRIVER' && (
                  <Badge className="bg-primary text-white">Selected</Badge>
                )}
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <DollarSign className="w-4 h-4 text-primary" />
                  <span>Earn money on your schedule</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>Work when you want</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>Get ride requests nearby</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Star className="w-4 h-4 text-primary" />
                  <span>Build your reputation</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Continue Button */}
        <div className="text-center">
          <Button 
            size="lg" 
            className="button-3d gradient-3d border-0 text-white px-12 py-6 text-lg"
            disabled={!selectedRole}
            onClick={handleContinue}
          >
            {selectedRole === 'PASSENGER' && 'Continue as Passenger'}
            {selectedRole === 'DRIVER' && 'Continue as Driver'}
            {!selectedRole && 'Select a role to continue'}
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>

          {/* Sign In Link */}
          <div className="mt-6">
            <p className="text-sm text-muted-foreground">
              Already have an account?{' '}
              <Button 
                variant="link" 
                className="p-0 h-auto font-medium text-primary"
                onClick={() => navigate('/signin')}
              >
                Sign In
              </Button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
