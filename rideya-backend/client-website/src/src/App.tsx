import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { RideBooking } from "./components/RideBooking";
import { DriverInfo } from "./components/DriverInfo";
import { MapPlaceholder } from "./components/MapPlaceholder";
import { Footer } from "./components/Footer";
import { SignUpPage } from "./components/SignUpPage";
import { LoadingPage } from "./components/LoadingPage";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Button } from "./components/ui/button";
import { ChevronUp } from "lucide-react";

function HomePage() {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState<"booking" | "tracking">("booking");
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'signup') {
      navigate('/signup');
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Scroll animation observer
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    // Use a timeout to ensure DOM is ready
    const timer = setTimeout(() => {
      const animateElements = document.querySelectorAll('.animate-on-scroll');
      animateElements.forEach((el) => observer.observe(el));
    }, 100);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  // Scroll-to-top button visibility
  useEffect(() => {
    const toggleScrollTop = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', toggleScrollTop);
    return () => window.removeEventListener('scroll', toggleScrollTop);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header onNavigate={scrollToSection} />
      
      {/* Hero Section */}
      <section id="home" className="animate-on-scroll">
        <HeroSection onNavigate={scrollToSection} />
      </section>

      {/* Main App Interface */}
      <section id="booking" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-16 animate-on-scroll">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-3d">Book Your Ride</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Experience seamless transportation with our easy-to-use platform. 
            Choose your ride, track your driver, and reach your destination safely.
          </p>
        </div>

        <Tabs value={activeView} onValueChange={(value: string) => setActiveView(value as "booking" | "tracking")} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8 card-3d">
            <TabsTrigger value="booking" className="ripple">Book a Ride</TabsTrigger>
            <TabsTrigger value="tracking" className="ripple">Track Ride</TabsTrigger>
          </TabsList>

          <div className="grid lg:grid-cols-2 gap-2 items-start">
            {/* Left Column - Booking/Driver Info */}
            <div className="flex justify-center">
              <TabsContent value="booking" className="mt-0">
                <RideBooking onBookingComplete={() => setActiveView("tracking")} />
              </TabsContent>
              <TabsContent value="tracking" className="mt-0">
                <DriverInfo />
              </TabsContent>
            </div>

            {/* Right Column - Map */}
            <div className="h-[600px] lg:sticky lg:top-8">
              <MapPlaceholder />
            </div>
          </div>
        </Tabs>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="bg-muted/30 py-16 animate-on-scroll">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-3d">How It Works</h2>
            <p className="text-muted-foreground">Getting a ride is simple and straightforward</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4 card-3d p-6 rounded-xl bg-white/70 backdrop-blur-sm cursor-pointer hover:scale-105 transition-transform duration-300" onClick={() => scrollToSection('booking')}>
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="font-semibold">Request a Ride</h3>
              <p className="text-muted-foreground">
                Enter your pickup and destination locations, then choose your preferred vehicle type.
              </p>
            </div>

            <div className="text-center space-y-4 card-3d p-6 rounded-xl bg-white/70 backdrop-blur-sm cursor-pointer hover:scale-105 transition-transform duration-300" onClick={() => scrollToSection('booking')}>
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="font-semibold">Get Matched</h3>
              <p className="text-muted-foreground">
                We'll connect you with a nearby verified driver and provide real-time tracking.
              </p>
            </div>

            <div className="text-center space-y-4 card-3d p-6 rounded-xl bg-white/70 backdrop-blur-sm cursor-pointer hover:scale-105 transition-transform duration-300" onClick={() => scrollToSection('booking')}>
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="font-semibold">Enjoy the Ride</h3>
              <p className="text-muted-foreground">
                Sit back and relax while your driver takes you safely to your destination.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 animate-on-scroll">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-3d">Our Services</h2>
            <p className="text-muted-foreground">Choose the perfect ride for every occasion</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "RideyaBike",
                price: "Rs. 150",
                icon: "🏍️",
                description: "Quick rides for solo travelers",
                features: ["Eco-friendly", "Fast delivery", "Budget-friendly"]
              },
              {
                name: "RideyaWheel",
                price: "Rs. 250", 
                icon: "🛺",
                description: "Traditional tuk-tuk experience",
                features: ["Cultural experience", "Short distances", "City tours"]
              },
              {
                name: "RideyaCar",
                price: "Rs. 450",
                icon: "🚗", 
                description: "Comfortable car rides",
                features: ["AC comfort", "Safe travel", "Professional drivers"]
              },
              {
                name: "RideyaXL",
                price: "Rs. 650",
                icon: "🚐",
                description: "Spacious group transport",
                features: ["Up to 7 seats", "Group travel", "Airport transfers"]
              }
            ].map((service) => (
              <div 
                key={service.name} 
                className="card-3d bg-white rounded-xl p-6 border border-border/20 cursor-pointer hover:scale-105 transition-all duration-300"
                onClick={() => scrollToSection('booking')}
              >
                <div className="text-center mb-4">
                  <div className="text-4xl mb-3">{service.icon}</div>
                  <h3 className="font-bold text-lg mb-2">{service.name}</h3>
                  <p className="text-2xl font-bold text-primary mb-2">{service.price}</p>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                </div>
                
                <div className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Button 
                  className="w-full mt-4 button-3d gradient-3d border-0 text-white text-sm ripple"
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    scrollToSection('booking');
                  }}
                >
                  Book Now
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="animate-on-scroll">
        <Footer />
      </section>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`scroll-to-top ${showScrollTop ? 'visible' : ''}`}
        aria-label="Scroll to top"
      >
        <ChevronUp className="w-6 h-6" />
      </button>
    </div>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <LoadingPage onLoadingComplete={handleLoadingComplete} duration={3000} />;
  }

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signup" element={<SignUpPage onNavigate={(sectionId) => {
        // This will be handled by the SignUpPage component
        if (sectionId === 'home') {
          window.location.href = '/';
        }
      }} />} />
    </Routes>
  );
}