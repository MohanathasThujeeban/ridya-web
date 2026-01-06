import { useState } from "react";
import { Button } from "./ui/button";
import { Menu, X, Phone, Mail, User, Bell } from "lucide-react";
import rideyaLogo from "figma:asset/6e7f4dbeb5a4a8f55405b8ef99dd0323b83f0292.png";

interface HeaderProps {
  onNavigate?: (sectionId: string) => void;
}

export function Header({ onNavigate }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="relative w-full header-3d border-b border-border/20 sticky top-0 z-[100]">
      {/* 3D Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-xl floating-3d"></div>
        <div className="absolute -top-8 right-20 w-32 h-32 bg-gradient-to-br from-accent/15 to-primary/15 rounded-full blur-2xl floating-3d" style={{ animationDelay: '-2s' }}></div>
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo Section with Enhanced Touch Animation */}
          <div 
            className="flex items-center space-x-2 md:space-x-3 header-logo-touch flex-shrink-0"
            onClick={() => onNavigate?.('home')}
          >
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
              <p className="text-xs text-muted-foreground font-medium">Smart Transportation • Sri Lanka</p>
            </div>
          </div>

          {/* Desktop Navigation with 3D Effects */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {[
              { name: 'Home', id: 'home' },
              { name: 'Services', id: 'services' },
              { name: 'Book Ride', id: 'booking' },
              { name: 'How It Works', id: 'how-it-works' },
              { name: 'Contact', id: 'contact' }
            ].map((item) => (
              <button
                key={item.name}
                onClick={() => onNavigate?.(item.id)}
                className="header-nav-item text-foreground font-medium text-sm xl:text-base touch-feedback"
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Action Buttons with 3D Effects */}
          <div className="flex items-center space-x-2 md:space-x-3">
            {/* Contact Info - Hidden on smaller screens */}
            <div className="hidden 2xl:flex items-center space-x-4 text-sm text-muted-foreground mr-4">
              <div className="flex items-center space-x-1">
                <Phone className="w-4 h-4 text-primary" />
                <span className="whitespace-nowrap">+94 11 789 RIDE</span>
              </div>
              <div className="flex items-center space-x-1">
                <Mail className="w-4 h-4 text-primary" />
                <span className="whitespace-nowrap">help@rideya.lk</span>
              </div>
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-1 md:space-x-2">
              <Button variant="ghost" size="icon" className="relative header-button-touch w-8 h-8 md:w-10 md:h-10">
                <Bell className="w-3 h-3 md:w-4 md:h-4" />
                <span className="absolute -top-1 -right-1 w-2 h-2 md:w-3 md:h-3 bg-primary rounded-full text-xs"></span>
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="hidden sm:flex header-button-touch text-xs md:text-sm px-2 md:px-3"
                onClick={() => onNavigate?.('signin')}
              >
                <User className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                Sign In
              </Button>
              
              <Button 
                size="sm" 
                className="button-3d gradient-3d border-0 text-white shadow-lg header-button-touch text-xs md:text-sm px-2 md:px-3"
                onClick={() => onNavigate?.('role-select')}
              >
                Sign Up
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

        {/* Mobile Menu with 3D Animation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-background/98 backdrop-blur-lg border-t border-border/20 card-3d z-50 max-h-screen overflow-y-auto">
            <div className="p-4 md:p-6 space-y-4">
              {/* Mobile Navigation */}
              <nav className="space-y-2">
                {[
                  { name: 'Home', id: 'home' },
                  { name: 'Services', id: 'services' },
                  { name: 'Book Ride', id: 'booking' },
                  { name: 'How It Works', id: 'how-it-works' },
                  { name: 'Contact', id: 'contact' }
                ].map((item) => (
                  <button
                    key={item.name}
                    onClick={() => {
                      onNavigate?.(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className="block header-nav-item text-foreground font-medium py-3 px-4 w-full text-left rounded-lg hover:bg-muted/20 touch-feedback"
                  >
                    {item.name}
                  </button>
                ))}
              </nav>

              {/* Mobile Contact */}
              <div className="space-y-3 pt-4 border-t border-border/20">
                <h4 className="font-medium text-foreground mb-2">Contact Us</h4>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Phone className="w-4 h-4 text-primary" />
                  <span>+94 11 789 RIDE</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Mail className="w-4 h-4 text-primary" />
                  <span>help@rideya.lk</span>
                </div>
              </div>

              {/* Mobile Action Buttons */}
              <div className="flex flex-col space-y-3 pt-4">
                <Button 
                  variant="outline" 
                  className="w-full header-button-touch"
                  onClick={() => {
                    onNavigate?.('booking');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <User className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
                <Button 
                  className="w-full button-3d gradient-3d border-0 text-white header-button-touch"
                  onClick={() => {
                    onNavigate?.('signup');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Sign Up
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
    </header>
  );
}