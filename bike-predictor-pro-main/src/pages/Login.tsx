import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Bike, Eye, EyeOff, Lock, User, Zap, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface LoginProps {
  onLogin: () => void;
}

interface User {
  username: string;
  password: string;
}

type PasswordStrength = "very-weak" | "weak" | "medium" | "strong";

interface PasswordState {
  strength: PasswordStrength;
  score: number;
}

const Login = ({ onLogin }: LoginProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [passwordStrength, setPasswordStrength] = useState<PasswordState>({ strength: "very-weak", score: 0 });
  const navigate = useNavigate();

  // Load users from localStorage
  useEffect(() => {
    try {
      const savedUsers = localStorage.getItem("ridewise_users");
      if (savedUsers) {
        setUsers(JSON.parse(savedUsers));
      }
    } catch (err) {
      console.error("Error loading users:", err);
    }
  }, []);

  // Password strength checker - FIXED TYPE
  useEffect(() => {
    const pwd = password;
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[a-z]/.test(pwd)) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;

    const strength: PasswordStrength = 
      score >= 4 ? "strong" : 
      score >= 3 ? "medium" : 
      score >= 2 ? "weak" : "very-weak";
    
    setPasswordStrength({ strength, score });
  }, [password]);

  // Save users
  const saveUsers = (newUsers: User[]) => {
    try {
      setUsers(newUsers);
      localStorage.setItem("ridewise_users", JSON.stringify(newUsers));
    } catch (err) {
      console.error("Error saving users:", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    
    // Check if user exists
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
      toast.error("❌ Invalid username or password");
      return;
    }

    // YOUR ORIGINAL LOGIN FLOW - WORKING
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsTransitioning(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    toast.success("Welcome to RideWise!");
    onLogin();
    navigate("/dashboard");
    setIsLoading(false);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    if (users.find(u => u.username === username)) {
      toast.error("👤 Username already exists!");
      return;
    }

    if (passwordStrength.strength !== "strong") {
      toast.error("🔒 Password too weak! Need strong password");
      return;
    }

    const newUser: User = { username, password };
    saveUsers([...users, newUser]);
    toast.success("✅ Account created! Now login.");
  };

  return (
    <div className={`min-h-screen flex items-center justify-center bg-background relative overflow-hidden transition-all duration-700 ${isTransitioning ? "opacity-0 scale-110" : ""}`}>
      {/* YOUR ORIGINAL ANIMATED BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
        <div className="absolute bottom-0 left-0 right-0 h-32 opacity-20">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute h-1 bg-gradient-to-r from-transparent via-primary to-transparent animate-road-lines"
              style={{
                top: `${i * 20}%`,
                width: "200px",
                animationDelay: `${i * 0.5}s`,
                left: `${i * 15}%`,
              }}
            />
          ))}
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] gradient-radial-glow" />
        <div className="absolute top-20 right-20 opacity-20 animate-float">
          <Bike className="w-20 h-20 text-primary animate-glow-pulse" />
        </div>
        <div className="absolute bottom-32 left-16 opacity-15 animate-float" style={{ animationDelay: "2s" }}>
          <Bike className="w-14 h-14 text-secondary" />
        </div>
        <div className="absolute top-1/3 left-10 opacity-10 animate-float" style={{ animationDelay: "1s" }}>
          <Bike className="w-10 h-10 text-accent" />
        </div>
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px),
                              linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)`,
            backgroundSize: "80px 80px"
          }} />
        </div>
      </div>

      <div className={`w-full max-w-md relative z-10 px-4 ${isTransitioning ? "animate-bike-ignition" : "animate-scale-in"}`}>
        {/* YOUR ORIGINAL HEADER */}
        <div className="text-center mb-10">
          <div className={`inline-flex items-center justify-center w-24 h-24 rounded-2xl mb-6 glass-card neon-blue ${isLoading ? "" : ""}`}>
            <Bike className={`w-12 h-12 text-primary ${isLoading ? "animate-wheel-spin" : "animate-glow-pulse"}`} />
          </div>
          <h1 className="text-5xl font-extrabold text-foreground mb-3 tracking-tight">
            <span className="text-gradient-primary">Ride</span>
            <span className="text-foreground">Wise</span>
          </h1>
          <p className="text-lg text-muted-foreground flex items-center justify-center gap-2">
            <Zap className="w-4 h-4 text-accent" />
            Ride Smarter. Plan Better.
            <Zap className="w-4 h-4 text-accent" />
          </p>
        </div>

        <div className="glass-card rounded-2xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-xl font-bold text-foreground">Welcome Back</h2>
            <p className="text-sm text-muted-foreground mt-2">Sign in to access your intelligence hub</p>
          </div>

          {/* Login/Register Toggle */}
          <div className="flex bg-muted/30 rounded-xl p-1 mb-4">
            <button
              type="button"
              onClick={handleRegister}
              className="flex-1 py-2 px-3 rounded-lg text-xs font-semibold bg-emerald-500/20 hover:bg-emerald-500/40 text-emerald-800 border border-emerald-500/30 transition-all"
              disabled={isLoading}
            >
              📝 Register
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="flex-1 py-2 px-3 rounded-lg text-xs font-semibold bg-blue-500/20 hover:bg-blue-500/40 text-blue-800 border border-blue-500/30 transition-all"
              disabled={isLoading}
            >
              🔐 Login
            </button>
          </div>

          <form onSubmit={handleRegister} className="space-y-6">
            {/* Username Input */}
            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm font-medium text-foreground">
                Username
              </Label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-11 h-12 bg-muted/50 border-border hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
            </div>

            {/* Password Input + Strength */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-foreground">
                Password
              </Label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-11 pr-11 h-12 bg-muted/50 border-border hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Password Strength Indicator */}
              {password && (
                <div className="mt-3 p-3 bg-muted/40 rounded-xl border border-border/50">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-20 h-2 rounded-full overflow-hidden border ${
                      passwordStrength.strength === 'strong' ? 'border-emerald-400' : 
                      passwordStrength.strength === 'medium' ? 'border-yellow-400' : 
                      passwordStrength.strength === 'weak' ? 'border-orange-400' : 'border-red-400'
                    }`}>
                      <div className={`h-full transition-all duration-300 ${
                        passwordStrength.strength === 'strong' ? 'bg-emerald-400' : 
                        passwordStrength.strength === 'medium' ? 'bg-yellow-400' : 
                        passwordStrength.strength === 'weak' ? 'bg-orange-400' : 'bg-red-400'
                      }`} 
                      style={{ width: `${(passwordStrength.score / 5) * 100}%` }} />
                    </div>
                    <span className={`text-xs font-medium capitalize ${
                      passwordStrength.strength === 'strong' ? 'text-emerald-600' : 
                      passwordStrength.strength === 'medium' ? 'text-yellow-600' : 
                      passwordStrength.strength === 'weak' ? 'text-orange-600' : 'text-red-600'
                    }`}>
                      {passwordStrength.strength}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* YOUR ORIGINAL BUTTON */}
            <Button
              type="submit"
              size="lg"
              className="w-full h-14 gradient-primary text-primary-foreground font-bold text-lg shadow-glow hover:shadow-hover transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] btn-glow disabled:opacity-60 disabled:cursor-not-allowed"
              disabled={isLoading || passwordStrength.strength !== "strong" || !username}
            >
              {isLoading ? (
                <span className="flex items-center gap-3">
                  <Bike className="w-6 h-6 animate-wheel-spin" />
                  Igniting...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Start Your Ride
                </span>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-muted-foreground">
              💡 Strong password: <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">MyPass123!</code>
            </p>
          </div>
        </div>

        {/* YOUR ORIGINAL FOOTER */}
        <div className="text-center mt-8 space-y-2">
          <p className="text-xs text-muted-foreground">
            AI-Powered Demand Intelligence • Real-time Analytics
          </p>
          <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground/60">
            <span>Smart Mobility</span>
            <span className="w-1 h-1 rounded-full bg-primary/50" />
            <span>Enterprise Ready</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
