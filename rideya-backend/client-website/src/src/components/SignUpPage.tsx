import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
import { ArrowLeft, Mail, Phone, Eye, EyeOff } from "lucide-react";
import rideyaLogo from "figma:asset/6e7f4dbeb5a4a8f55405b8ef99dd0323b83f0292.png";

interface SignUpPageProps {
  onNavigate?: (sectionId: string) => void;
}

export function SignUpPage({}: SignUpPageProps) {
  const navigate = useNavigate();
  const [authMethod, setAuthMethod] = useState<'google' | 'phone' | 'email'>('google');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    otp: ''
  });
  const [step, setStep] = useState<'method' | 'details' | 'otp'>('method');

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleGoogleSignUp = () => {
    // Google OAuth integration will go here
    console.log('Google Sign Up');
  };

  const handlePhoneSignUp = () => {
    if (formData.phone) {
      setStep('otp');
      // SMS OTP logic will go here
      console.log('Sending OTP to:', formData.phone);
    }
  };

  const handleEmailSignUp = () => {
    if (formData.email && formData.password) {
      // Email signup logic will go here
      console.log('Email Sign Up:', formData.email);
    }
  };

  const handleOTPVerification = () => {
    if (formData.otp) {
      setStep('details');
      console.log('OTP Verified:', formData.otp);
    }
  };

  const handleCompleteSignUp = () => {
    console.log('Complete Sign Up:', formData);
    // Navigate to dashboard or home
    navigate('/');
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-xl floating-3d"></div>
        <div className="absolute -bottom-8 right-20 w-32 h-32 bg-gradient-to-br from-accent/15 to-primary/15 rounded-full blur-2xl floating-3d" style={{ animationDelay: '-2s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-lg floating-3d" style={{ animationDelay: '-4s' }}></div>
      </div>

      <div className="w-full max-w-md relative">
        {/* Back Button */}
        <Button
          variant="ghost"
          size="sm"
          className="mb-6 touch-feedback"
          onClick={handleBackToHome}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <Card className="p-8 shadow-2xl border-0 bg-white/95 backdrop-blur-lg card-3d">
          {/* Logo and Header */}
          <div className="text-center mb-8">
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
            <h1 className="text-2xl font-bold text-foreground mb-2">Join RIDEYA</h1>
            <p className="text-muted-foreground">Smart Transportation • Sri Lanka</p>
          </div>

          {/* Step: Choose Authentication Method */}
          {step === 'method' && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-center mb-6">Choose Sign Up Method</h2>
              
              {/* Google Sign Up */}
              <Button
                variant="outline"
                className="w-full py-6 border-2 hover:border-primary/50 touch-feedback"
                onClick={handleGoogleSignUp}
              >
                <div className="flex items-center justify-center space-x-3">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="font-medium">Continue with Google</span>
                </div>
              </Button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-muted-foreground">Or</span>
                </div>
              </div>

              {/* Phone Sign Up */}
              <Button
                variant="outline"
                className="w-full py-6 border-2 hover:border-primary/50 touch-feedback"
                onClick={() => setAuthMethod('phone')}
              >
                <Phone className="w-5 h-5 mr-3" />
                <span className="font-medium">Continue with Phone</span>
              </Button>

              {/* Email Sign Up */}
              <Button
                variant="outline"
                className="w-full py-6 border-2 hover:border-primary/50 touch-feedback"
                onClick={() => setAuthMethod('email')}
              >
                <Mail className="w-5 h-5 mr-3" />
                <span className="font-medium">Continue with Email</span>
              </Button>

              {/* Show form based on selected method */}
              {authMethod === 'phone' && (
                <div className="mt-6 space-y-4">
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+94 70 123 4567"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <Button 
                    className="w-full button-3d gradient-3d"
                    onClick={handlePhoneSignUp}
                  >
                    Send OTP
                  </Button>
                </div>
              )}

              {authMethod === 'email' && (
                <div className="mt-6 space-y-4">
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a strong password"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        className="mt-1 pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <Button 
                    className="w-full button-3d gradient-3d"
                    onClick={handleEmailSignUp}
                  >
                    Create Account
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Step: OTP Verification */}
          {step === 'otp' && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <h2 className="text-lg font-semibold mb-2">Verify Your Phone</h2>
                <p className="text-muted-foreground">
                  We've sent a 6-digit code to <br />
                  <span className="font-medium">{formData.phone}</span>
                </p>
              </div>
              
              <div>
                <Label htmlFor="otp">Enter OTP Code</Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="123456"
                  maxLength={6}
                  value={formData.otp}
                  onChange={(e) => handleInputChange('otp', e.target.value)}
                  className="mt-1 text-center text-lg tracking-widest"
                />
              </div>

              <Button 
                className="w-full button-3d gradient-3d"
                onClick={handleOTPVerification}
              >
                Verify & Continue
              </Button>

              <Button 
                variant="ghost" 
                className="w-full"
                onClick={() => setStep('method')}
              >
                Change Phone Number
              </Button>
            </div>
          )}

          {/* Step: Complete Profile */}
          {step === 'details' && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <h2 className="text-lg font-semibold mb-2">Complete Your Profile</h2>
                <p className="text-muted-foreground">Tell us a bit about yourself</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>

              {authMethod === 'phone' && (
                <div>
                  <Label htmlFor="profileEmail">Email Address (Optional)</Label>
                  <Input
                    id="profileEmail"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="mt-1"
                  />
                </div>
              )}

              <Button 
                className="w-full button-3d gradient-3d"
                onClick={handleCompleteSignUp}
              >
                Complete Sign Up
              </Button>
            </div>
          )}

          {/* Sign In Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{' '}
              <Button variant="link" className="p-0 h-auto font-medium text-primary">
                Sign In
              </Button>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}