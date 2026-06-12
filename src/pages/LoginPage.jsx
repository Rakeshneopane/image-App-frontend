import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

export const LoginPage = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = (e) => {
    e.preventDefault();
    window.location.href = `${import.meta.env.VITE_BASE_URL}/auth/google`;
  };

  const handleDemoLogin = () => {
    console.log("Demo login clicked");
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Card container */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Left decorative bar - subtle accent */}
          <div className="h-1.5 w-full bg-gradient-to-r from-gray-400 to-gray-500" />
          
          <div className="p-8 sm:p-10">
            {/* Logo / Brand Section */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl mb-4 shadow-md">
                <span className="text-white font-bold text-2xl">KP</span>
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                KaviosPix
              </h1>
              <p className="text-gray-500 mt-2 text-sm">     
                Your memories, beautifully organized.
              </p>
            </div>

            {/* Feature highlights - subtle list */}
            <div className="mb-8 bg-gray-50 rounded-xl p-4 space-y-2">
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider text-center mb-2">
                Premium photo collaboration
              </p>
              <div className="flex justify-between text-xs text-gray-600">
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                  Unlimited Storage
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                  Easy Sharing
                </span>
              </div>
            </div>

            {/* Welcome back text */}
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                Welcome back
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Sign in to access your photos and albums
              </p>
            </div>

            {/* Main action buttons */}
            <div className="space-y-4">
              {/* Google Login Button - Primary */}
              <Button
                onClick={handleGoogleLogin}
                variant="outline"
                className="w-full flex items-center justify-center gap-3 py-6 border-gray-300 bg-white hover:bg-gray-50 transition-all duration-200 rounded-xl shadow-sm"
              >
                <GoogleIcon className="h-5 w-5" />
                <span className="font-medium text-gray-700">
                  Continue with Google
                </span>
              </Button>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-3 bg-white text-gray-400 font-medium">
                    OR CONTINUE WITH
                  </span>
                </div>
              </div>

              {/* Demo Account Button */}
              <Button
                onClick={handleDemoLogin}
                className="w-full bg-gradient-to-r from-gray-300 to-gray-500 hover:from-gray-400 hover:to-gray-600 text-dark font-medium py-6 rounded-xl shadow-md transition-all duration-200"
              >
                <Mail className="h-4 w-4 mr-2" />
                Try Demo Account
              </Button>
            </div>

            {/* Terms and Privacy */}
            <p className="text-xs text-center text-gray-400 mt-8">
              By continuing, you agree to our{" "}
              <a href="#" className="text-gray-500 hover:text-gray-700 underline-offset-2 hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-gray-500 hover:text-gray-700 underline-offset-2 hover:underline">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
        
        {/* Optional footer credit */}
        <p className="text-center text-xs text-gray-400 mt-6">
          Secure photo storage & collaboration
        </p>
      </div>
    </div>
  );
};

// Optional: Create a simple Google Icon component if you don't have one
// Or you can use lucide-react's Chrome icon as a fallback
const GoogleIcon = ({ className = "h-5 w-5" }) => (
  <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);