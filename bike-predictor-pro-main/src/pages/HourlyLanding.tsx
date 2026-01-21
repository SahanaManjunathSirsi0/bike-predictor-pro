import React from "react";
import { ArrowRight, FileText, Sliders, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Link } from "react-router-dom";

interface HourlyLandingProps {
  onLogout: () => void;
}

const HourlyLanding = ({ onLogout }: HourlyLandingProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar onLogout={onLogout} />
      <main className="container mx-auto px-4 py-12">
        {/* Hero Header */}
        <div className="text-center mb-16">
          <div className="p-4 rounded-2xl glass-card neon-blue inline-flex mb-6">
            <Clock className="w-6 h-6 text-primary mr-2" />
            <span className="font-bold text-lg">Hourly Intelligence</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-6">
            Choose Your Analysis
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Select data source for precise hourly demand forecasting
          </p>
        </div>

        {/* Choice Cards */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Manual Input */}
          <Link to="/hourly/manual" className="group">
            <div className="glass-card hover:glass-card-hover rounded-3xl p-10 h-72 flex flex-col items-center justify-center text-center transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl border-2 border-transparent hover:border-primary/50">
              <div className="w-20 h-20 glass-card rounded-2xl flex items-center justify-center mb-8 bg-gradient-to-br from-blue-500/20 to-primary/20 group-hover:neon-blue">
                <Sliders className="w-10 h-10 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-4 text-foreground">
                Manual Configuration
              </h2>
              <p className="text-muted-foreground mb-10 leading-relaxed max-w-sm">
                Fine-tune season, weather, temperature sliders for custom scenario analysis
              </p>
              <ArrowRight className="w-7 h-7 text-primary ml-auto group-hover:translate-x-2 transition-all duration-300" />
            </div>
          </Link>

          {/* CSV Upload */}
          <Link to="/hourly/csv" className="group">
            <div className="glass-card hover:glass-card-hover rounded-3xl p-10 h-72 flex flex-col items-center justify-center text-center transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl border-2 border-transparent hover:border-green-500/50">
              <div className="w-20 h-20 glass-card rounded-2xl flex items-center justify-center mb-8 bg-gradient-to-br from-green-500/20 to-emerald-500/20 group-hover:neon-green">
                <FileText className="w-10 h-10 text-emerald-500" />
              </div>
              <h2 className="text-2xl font-bold mb-4 text-foreground">
                CSV Data Upload
              </h2>
              <p className="text-muted-foreground mb-10 leading-relaxed max-w-sm">
                Upload operational datasets for real hourly demand visualization and insights
              </p>
              <ArrowRight className="w-7 h-7 text-emerald-500 ml-auto group-hover:translate-x-2 transition-all duration-300" />
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default HourlyLanding;
