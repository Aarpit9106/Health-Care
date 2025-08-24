import { Button } from "@/components/ui/button";
import { Play, ArrowRight, CheckCircle, Award, Star } from "lucide-react";

export function Hero() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 dark:from-slate-900 dark:via-black dark:to-slate-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-medical-teal rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-medical-teal rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-blue-400 rounded-full blur-2xl" />
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Enterprise Healthcare
                <span className="block bg-gradient-to-r from-medical-teal to-cyan-400 bg-clip-text text-transparent">
                  Management Platform
                </span>
              </h1>

              <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
                Streamline healthcare operations with our comprehensive digital
                platform. Advanced analytics, automated workflows, and
                enterprise-grade security designed for healthcare professionals
                and institutions.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-medical-teal hover:bg-medical-teal/90 text-white px-8 py-3 text-lg font-semibold group"
              >
                GET STARTED
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="border-2 border-gray-400 text-white hover:bg-white/10 px-8 py-3 text-lg font-semibold group"
              >
                <Play className="mr-2 w-5 h-5" />
                LEARN MORE
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-8 pt-8 border-t border-gray-700">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-sm text-gray-300">HIPAA Compliant</span>
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-sm text-gray-300">FDA Approved</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-300 ml-1">
                    4.9★ Rating
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Brain Image Section */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative">
              {/* Active Badge */}
              <div className="absolute -top-4 -right-4 z-10">
                <div className="bg-medical-teal text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                  ACTIVE
                </div>
              </div>

              {/* Brain Image Container */}
              <div className="relative w-80 h-64 bg-gradient-to-br from-gray-600 to-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-600">
                {/* Brain SVG Illustration */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg
                    viewBox="0 0 200 150"
                    className="w-48 h-36 text-pink-300"
                    fill="currentColor"
                  >
                    <path
                      d="M50 75c0-30 20-50 50-50s50 20 50 50c0 15-5 25-15 35-5 5-10 8-15 10h-40c-5-2-10-5-15-10-10-10-15-20-15-35z"
                      opacity="0.8"
                    />
                    <path
                      d="M60 70c0-20 15-35 35-35s35 15 35 35c0 10-5 20-10 25-3 3-7 5-10 7h-30c-3-2-7-4-10-7-5-5-10-15-10-25z"
                      opacity="0.6"
                    />
                    <path
                      d="M75 75c0-15 10-25 25-25s25 10 25 25c0 8-3 15-8 20-2 2-5 3-7 4h-20c-2-1-5-2-7-4-5-5-8-12-8-20z"
                      opacity="0.4"
                    />
                    {/* Brain details */}
                    <circle cx="85" cy="65" r="3" opacity="0.7" />
                    <circle cx="115" cy="65" r="3" opacity="0.7" />
                    <path
                      d="M70 80 Q100 85 130 80"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      opacity="0.5"
                    />
                    <path
                      d="M75 90 Q100 95 125 90"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      opacity="0.5"
                    />
                  </svg>
                </div>

                {/* Glowing effects */}
                <div className="absolute inset-0 bg-gradient-to-t from-medical-teal/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-medical-teal/30 to-transparent" />
              </div>

              {/* Floating elements */}
              <div className="absolute -top-8 -left-8 w-16 h-16 bg-medical-teal/20 rounded-full blur-xl animate-pulse" />
              <div
                className="absolute -bottom-6 -right-6 w-12 h-12 bg-cyan-400/20 rounded-full blur-xl animate-pulse"
                style={{ animationDelay: "1s" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
