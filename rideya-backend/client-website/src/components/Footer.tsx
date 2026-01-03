import { MapPin, Mail, Phone, Facebook, Twitter, Instagram, Linkedin, Youtube, Star, Users, Car, Clock } from "lucide-react";
import rideyaLogo from "figma:asset/6e7f4dbeb5a4a8f55405b8ef99dd0323b83f0292.png";

export function Footer() {
  const stats = [
    { icon: Users, value: "500K+", label: "Trusted Users", description: "across Sri Lanka" },
    { icon: Car, value: "25K+", label: "Verified Drivers", description: "ready to serve" },
    { icon: Star, value: "4.8★", label: "User Rating", description: "excellent service" },
    { icon: Clock, value: "24/7", label: "Always Available", description: "island-wide coverage" }
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Youtube, href: "#", label: "YouTube" }
  ];

  return (
    <footer className="relative w-full footer-3d text-white overflow-hidden">
      {/* 3D Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-40 h-40 bg-gradient-to-br from-primary/30 to-accent/30 rounded-full blur-3xl floating-3d"></div>
        <div className="absolute bottom-20 right-20 w-60 h-60 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full blur-3xl floating-3d" style={{ animationDelay: '-3s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-gradient-to-br from-primary/25 to-accent/25 rounded-full blur-2xl floating-3d" style={{ animationDelay: '-1s' }}></div>
      </div>

      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats Section - Clean & Prominent Design */}
        <div className="py-16 border-b border-white/10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                {/* Icon */}
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                
                {/* Value without Background */}
                <div className="relative mb-4">
                  <div className="text-3xl font-bold text-white">
                    {stat.value}
                  </div>
                </div>
                
                {/* Labels */}
                <div className="space-y-1">
                  <div className="text-lg font-semibold text-white">{stat.label}</div>
                  <div className="text-sm text-white/70">{stat.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">
            {/* Company Info with 3D Logo */}
            <div className="lg:col-span-1 space-y-6">
              <div className="flex items-center space-x-3 logo-3d">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-xl blur-md opacity-50 glow-orange"></div>
                  <img 
                    src={rideyaLogo} 
                    alt="RIDEYA" 
                    className="relative w-16 h-16 object-contain filter drop-shadow-lg"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold logo-text">
                    RIDEYA
                  </h3>
                  <p className="text-sm text-white/70">Smart Transportation • Sri Lanka</p>
                </div>
              </div>
              
              <p className="text-white/80 leading-relaxed">
                Experience the future of transportation with RIDEYA. Safe, reliable, and affordable rides across Sri Lanka. From Colombo to Kandy, Galle to Jaffna - we're here to serve you 24/7.
              </p>
              
              {/* Social Links with 3D Effects */}
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a 
                    key={index}
                    href={social.href} 
                    className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center card-3d hover:bg-primary/20 transition-all duration-300 group"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5 text-white/70 group-hover:text-primary transition-colors" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h4 className="font-bold text-lg text-3d">Quick Links</h4>
              <ul className="space-y-3">
                {['Book a Ride', 'Become a Driver', 'Track Your Ride', 'Schedule Ride', 'Ride History', 'Payment Methods'].map((item, index) => (
                  <li key={index}>
                    <a href="#" className="text-white/70 hover:text-primary transition-all duration-300 nav-item-3d inline-block">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="space-y-6">
              <h4 className="font-bold text-lg text-3d">Our Services</h4>
              <ul className="space-y-3">
                {['Economy Rides', 'Premium Cars', 'Group Transport', 'Airport Transfers', 'Business Travel', 'Emergency Rides'].map((item, index) => (
                  <li key={index}>
                    <a href="#" className="text-white/70 hover:text-primary transition-all duration-300 nav-item-3d inline-block">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact & Support */}
            <div className="space-y-6">
              <h4 className="font-bold text-lg text-3d">Contact Us</h4>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3 card-3d bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-white/70">24/7 Hotline</p>
                    <p className="font-medium">+94 11 789 RIDE</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 card-3d bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-white/70">Email Support</p>
                    <p className="font-medium">help@rideya.lk</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 card-3d bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-white/70">Head Office</p>
                    <p className="font-medium">Colombo, Sri Lanka</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="py-8 border-t border-white/10">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-white/70">
              <p>© 2025 RIDEYA. All rights reserved.</p>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-primary transition-colors nav-item-3d">Privacy Policy</a>
                <a href="#" className="hover:text-primary transition-colors nav-item-3d">Terms of Service</a>
                <a href="#" className="hover:text-primary transition-colors nav-item-3d">Cookie Policy</a>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-white/70">
              <Star className="w-4 h-4 text-primary" />
              <span>Rated 4.8/5 by 500K+ Sri Lankan users</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient accent */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-primary via-accent to-primary"></div>
    </footer>
  );
}