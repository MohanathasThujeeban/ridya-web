import { Button } from "./ui/button";
import { ArrowRight, Smartphone, Shield, Clock } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useState, useEffect } from "react";
import rideyaVehicles from "figma:asset/77ad0c9333d36e3b277e29100128cf2b8107fd19.png";
import rideyaFleet from "figma:asset/7cdf30f9a82974526c48afa4e3a695673cd2c9f3.png";
import newTaxiImage from "figma:asset/83c8b1067d45cbbc8548a4fd71a2a0b91167c5e7.png";

interface HeroSectionProps {
  onNavigate?: (sectionId: string) => void;
}

export function HeroSection({ onNavigate }: HeroSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const vehicleImages = [
    {
      src: rideyaVehicles,
      alt: "RIDEYA Complete Vehicle Fleet - Bikes, Cars, Vans & More",
      title: "Complete Fleet",
      description: "All vehicle types in one platform"
    },
    {
      src: rideyaFleet,
      alt: "RIDEYA 3D Vehicle Collection - Premium Transportation",
      title: "Premium Vehicles",
      description: "Your RIDEYA taxi awaits - anywhere, anytime"
    }
  ];

  const features = [
    {
      icon: Smartphone,
      title: "Easy Booking",
      description: "Book a ride in seconds with our intuitive app"
    },
    {
      icon: Shield,
      title: "Safe & Secure",
      description: "Verified drivers and secure payment options"
    },
    {
      icon: Clock,
      title: "Quick Arrival",
      description: "Fast pickup times and real-time tracking"
    }
  ];

  // Auto-advance slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        setIsAnimating(true);
        setCurrentSlide((prev) => (prev + 1) % vehicleImages.length);
        setTimeout(() => setIsAnimating(false), 1200);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [isAnimating, vehicleImages.length]);

  const goToSlide = (index: number) => {
    if (!isAnimating && index !== currentSlide) {
      setIsAnimating(true);
      setCurrentSlide(index);
      setTimeout(() => setIsAnimating(false), 1200);
    }
  };

  return (
    <div className="w-full bg-gradient-to-br from-primary/5 to-blue-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-8 pb-16 lg:pt-12 lg:pb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
                  Get a ride in
                  <span className="text-primary block">minutes</span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-md">
                  Reliable transportation at your fingertips. Safe, fast, and affordable rides whenever you need them.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="group button-3d gradient-3d border-0 text-white ripple"
                  onClick={() => onNavigate?.('role-select')}
                >
                  Book Your Ride
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="card-3d border-primary/20 hover:border-primary ripple"
                  onClick={() => onNavigate?.('role-select')}
                >
                  Become a Driver
                </Button>
              </div>

              {/* Features */}
              <div className="grid sm:grid-cols-3 gap-6 pt-8">
                {features.map((feature, index) => (
                  <div key={index} className="space-y-2 card-3d p-4 rounded-lg bg-white/50 backdrop-blur-sm">
                    <div className="bg-gradient-to-br from-primary to-accent w-12 h-12 rounded-lg flex items-center justify-center glow-orange">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-medium">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Content - Full Container Slideshow */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-900 to-black">
                {/* Dynamic Slideshow Container - Full Size */}
                <div className="slideshow-container relative h-[600px] rounded-2xl overflow-hidden">
                  {vehicleImages.map((image, index) => (
                    <div
                      key={index}
                      className={`slideshow-image ${
                        index === currentSlide ? 'active' : 
                        index === (currentSlide - 1 + vehicleImages.length) % vehicleImages.length ? 'prev' : 'next'
                      }`}
                    >
                      <ImageWithFallback
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Image overlay info */}
                      <div className="absolute bottom-6 left-6 bg-black/30 backdrop-blur-md rounded-xl p-4 text-white">
                        <h4 className="font-bold text-lg mb-1">{image.title}</h4>
                        <p className="text-sm opacity-90">{image.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Slideshow Navigation Dots - Outside container */}
                <div className="slideshow-dots absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                  {vehicleImages.map((_, index) => (
                    <button
                      key={index}
                      className={`slideshow-dot ${index === currentSlide ? 'active' : ''}`}
                      onClick={() => goToSlide(index)}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}