import {
  Clock,
  Calendar,
  Activity,
  Bike,
  AlertTriangle,
  Zap,
  MapPin,
  Brain,
  Gauge,
} from "lucide-react";

import MetricCard from "@/components/MetricCard";
import ActionCard from "@/components/ActionCard";
import Navbar from "@/components/Navbar";
import BikeMap from "@/components/BikeMap";
import AlertCard from "@/components/AlertCard";
import Chatbot from "@/components/Chatbot";
import ParserUpload from "@/components/ParserUpload";

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard = ({ onLogout }: DashboardProps) => {
  const metrics = [
    {
      title: "Active Bikes",
      value: "847",
      subtitle: "Currently on the road",
      icon: Bike,
      color: "blue" as const,
    },
    {
      title: "Demand Pressure",
      value: "High",
      subtitle: "Index: 8.4 / 10",
      icon: Gauge,
      color: "orange" as const,
    },
    {
      title: "Peak Window",
      value: "5–7 PM",
      subtitle: "In 3 hours",
      icon: Clock,
      color: "green" as const,
    },
    {
      title: "AI Confidence",
      value: "94.2%",
      subtitle: "Model accuracy",
      icon: Brain,
      color: "purple" as const,
    },
  ];

  const actions = [
    {
      title: "Hourly Demand Prediction",
      description:
        "AI-powered hourly analysis to identify peak periods and optimize bike distribution.",
      icon: Clock,
      href: "/hourly",
    },
    {
      title: "Daily Demand Forecast",
      description:
        "Multi-day forecasting for strategic fleet planning and resource allocation.",
      icon: Calendar,
      href: "/daily",
    },
  ];

  const alerts = [
    {
      type: "demand" as const,
      title: "Surge Zone Detected",
      description: "Downtown demand is 40% above normal",
      value: "+40%",
    },
    {
      type: "warning" as const,
      title: "Low Inventory Alert",
      description: "Station #12 (Central Park) critically low",
      value: "3 bikes",
    },
    {
      type: "time" as const,
      title: "Rush Hour Incoming",
      description: "Evening peak begins in 2 hours",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar onLogout={onLogout} />

      <main className="container mx-auto px-4 py-6 pb-24">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-extrabold tracking-tight">
              Command Center
            </h1>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full glass-card text-xs">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <span className="text-secondary font-medium">Live</span>
            </div>
          </div>
          <p className="text-muted-foreground">
            Real-time bike sharing intelligence powered by machine learning
          </p>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {metrics.map((metric, index) => (
            <MetricCard key={metric.title} {...metric} delay={index * 100} />
          ))}
        </div>

        {/* Map + Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div
            className="lg:col-span-2 animate-slide-up"
            style={{ animationDelay: "200ms" }}
          >
            <div className="glass-card rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  Live Fleet Map
                </h2>
                <span className="text-xs px-3 py-1.5 rounded-full bg-muted/50 flex items-center gap-2">
                  <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
                  Real-time tracking
                </span>
              </div>
              <BikeMap />
            </div>
          </div>

          <div
            className="space-y-4 animate-slide-up"
            style={{ animationDelay: "300ms" }}
          >
            <h2 className="text-lg font-bold flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-accent" />
              Active Alerts
            </h2>
            {alerts.map((alert, index) => (
              <AlertCard
                key={alert.title}
                {...alert}
                delay={400 + index * 100}
              />
            ))}
          </div>
        </div>

        {/* AI Prediction */}
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" />
            AI Prediction Engine
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {actions.map((action, index) => (
              <ActionCard
                key={action.title}
                {...action}
                delay={500 + index * 100}
              />
            ))}
          </div>
        </div>

        {/* Parser Upload */}
        <div className="mb-8">
          <ParserUpload />
        </div>

        {/* How It Works */}
        <div
          className="glass-card rounded-2xl p-6 animate-slide-up"
          style={{ animationDelay: "700ms" }}
        >
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" />
            How RideWise Works
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-14 h-14 glass-card rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-primary font-bold text-xl">1</span>
              </div>
              <h4 className="font-bold mb-2">Configure Parameters</h4>
              <p className="text-sm text-muted-foreground">
                Weather, time, and seasonal inputs
              </p>
            </div>

            <div className="text-center">
              <div className="w-14 h-14 glass-card rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-secondary font-bold text-xl">2</span>
              </div>
              <h4 className="font-bold mb-2">AI Analysis</h4>
              <p className="text-sm text-muted-foreground">
                ML model processes demand patterns
              </p>
            </div>

            <div className="text-center">
              <div className="w-14 h-14 glass-card rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-accent font-bold text-xl">3</span>
              </div>
              <h4 className="font-bold mb-2">Actionable Insights</h4>
              <p className="text-sm text-muted-foreground">
                Smart decisions for fleet optimization
              </p>
            </div>
          </div>
        </div>
      </main>

      <Chatbot
        context={{
          page: "Dashboard",
          focus: "system_overview",
          message:
            "Provide high-level insights about bike demand, peak hours, and operational readiness."
        }}
      />

    </div>
  );
};

// ✅ THIS ONE LINE WAS MISSING - NOW ADDED
export default Dashboard;
