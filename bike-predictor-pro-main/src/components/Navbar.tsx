import { Button } from "@/components/ui/button";
import { Bike, LayoutDashboard, Clock, Calendar, Menu, X, Zap, Star } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import UserProfile from "./UserProfile";
import { useState } from "react";

interface NavbarProps {
  onLogout: () => void;
}

const Navbar = ({ onLogout }: NavbarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // ✅ RENTALS BUTTON ADDED HERE (4th item)
  const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Hourly", href: "/hourly", icon: Clock },
    { label: "Daily", href: "/daily", icon: Calendar },
    { label: "🏍️ Rentals", href: "/rent", icon: Bike },  // ✅ NEW RENTALS BUTTON
    { label: "Reviews", href: "/reviews", icon: Star },
  ];

  return (
    <nav className="bg-nav h-16 px-4 md:px-6 flex items-center justify-between shadow-lg sticky top-0 z-50 border-b border-nav-border">
      <div className="flex items-center gap-4 md:gap-8">
        {/* Logo */}
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => navigate("/dashboard")}
        >
          <div className="relative p-2.5 rounded-xl glass-card group-hover:neon-blue transition-all duration-300">
            <Bike className="w-6 h-6 text-primary animate-glow-pulse" />
            <div className="absolute inset-0 rounded-xl bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="hidden sm:block">
            <span className="text-foreground font-extrabold text-xl tracking-tight">
              <span className="text-gradient-primary">Ride</span>
              <span className="text-foreground">Wise</span>
            </span>
            <p className="text-[10px] text-muted-foreground -mt-0.5">Ride Smarter. Plan Better.</p>
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Button
              key={item.href}
              variant="ghost"
              size="sm"
              className={cn(
                "gap-2 text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-all duration-200 relative",
                location.pathname === item.href && "text-primary bg-primary/10 font-semibold"
              )}
              onClick={() => navigate(item.href)}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
              {location.pathname === item.href && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-primary rounded-full" />
              )}
            </Button>
          ))}
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/20 border border-secondary/30">
          <Zap className="w-3 h-3 text-secondary" />
          <span className="text-xs text-secondary font-medium">AI Active</span>
        </div>
        
        <UserProfile onLogout={onLogout} />
        
        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-muted-foreground hover:text-foreground hover:bg-primary/10"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-nav border-t border-nav-border p-4 md:hidden animate-slide-down shadow-2xl">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Button
                key={item.href}
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-3 text-muted-foreground hover:text-foreground hover:bg-primary/10",
                  location.pathname === item.href && "text-primary bg-primary/10 font-semibold"
                )}
                onClick={() => {
                  navigate(item.href);
                  setMobileMenuOpen(false);
                }}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
