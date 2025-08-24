import { Link, useLocation } from "react-router-dom";
import {
  Heart,
  Home,
  Pill,
  Brain,
  BookOpen,
  BarChart3,
  Camera,
  Calculator,
  Info,
  Settings,
  User,
  Sun,
  Moon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";

const navigationItems = [
  { name: "Home", icon: Home, href: "/" },
  { name: "Medication", icon: Pill, href: "/medication" },
  { name: "Mood Monitor", icon: Brain, href: "/mood-monitor" },
  { name: "Journal", icon: BookOpen, href: "/journal" },
  { name: "Dashboard", icon: BarChart3, href: "/dashboard" },
  { name: "Image Detector", icon: Camera, href: "/image-detector" },
  { name: "Cost Calculator", icon: Calculator, href: "/cost-calculator" },
  { name: "About", icon: Info, href: "/about" },
];

export function Sidebar() {
  const location = useLocation();
  const { actualTheme, toggleTheme } = useTheme();

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col">
      {/* Logo Section */}
      <div className="p-6 bg-gradient-to-r from-medical-gradient-from to-medical-gradient-to">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
            <Heart className="w-5 h-5 text-medical-teal" fill="currentColor" />
          </div>
          <div>
            <h1 className="text-white font-semibold text-lg">HealthCare</h1>
            <p className="text-white/80 text-sm">Pro</p>
          </div>
        </div>
      </div>

      {/* Welcome Section */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-medical-teal rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="font-semibold text-gray-900">Welcome Back</h2>
            <p className="text-sm text-gray-500">Patient Portal</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navigationItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-medical-teal-light text-medical-teal"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
              )}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.name}</span>
              {isActive && (
                <div className="w-2 h-2 bg-medical-teal rounded-full ml-auto" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Settings */}
      <div className="p-4 border-t border-gray-200 space-y-2">
        <Link
          to="/settings"
          className={cn(
            "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
            location.pathname === "/settings"
              ? "bg-medical-teal-light text-medical-teal"
              : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
          )}
        >
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </Link>

        <Button
          variant="ghost"
          size="sm"
          onClick={toggleTheme}
          className="w-full justify-start text-gray-700 hover:bg-gray-100 hover:text-gray-900"
        >
          {actualTheme === "light" ? (
            <Moon className="w-5 h-5 mr-3" />
          ) : (
            <Sun className="w-5 h-5 mr-3" />
          )}
          <span>{actualTheme === "light" ? "Dark Mode" : "Light Mode"}</span>
        </Button>
      </div>
    </div>
  );
}
