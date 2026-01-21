import React from "react";
import { ArrowRight, Upload, Sliders } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Link } from "react-router-dom";

interface DailyLandingProps {
  onLogout: () => void;
}

const DailyLanding = ({ onLogout }: DailyLandingProps) => {
  return (
    <div className="min-h-screen bg-background"> {/* SAME as Hourly */}
      <Navbar onLogout={onLogout} />
      
      <main className="container mx-auto px-4 py-6 pb-24">
        {/* Header - SAME style as HourlyLanding */}
        <div className="mb-12 animate-fade-in">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-xl glass-card neon-purple"> {/* Same glass effect */}
              <Sliders className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl font-black tracking-tight text-foreground">Daily Prediction</h1>
              <p className="text-muted-foreground text-lg">Multi-day demand forecasting for optimized operations</p>
            </div>
          </div>
        </div>

        {/* 2 Cards - EXACT HourlyLanding style */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          
          {/* Manual Card - SAME Hourly style */}
          <Link to="/daily/manual" className="group">
            <div className="glass-card h-[420px] p-10 rounded-3xl flex flex-col items-center justify-center 
                           text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 
                           border border-primary/20 group-hover:border-primary/40">
              
              <div className="w-24 h-24 bg-primary/20 rounded-3xl flex items-center justify-center mb-8 
                             border-2 border-dashed border-primary/30 group-hover:bg-primary/30 transition-all">
                <Sliders className="w-12 h-12 text-primary" />
              </div>
              
              <h2 className="text-3xl font-bold text-foreground mb-6 group-hover:text-primary transition-colors">
                Manual Input
              </h2>
              
              <p className="text-lg text-muted-foreground mb-10 leading-relaxed max-w-md">
                Month, season, temperature sliders for precise multi-day AI predictions
              </p>
              
              <div className="inline-flex items-center gap-3 bg-primary/10 hover:bg-primary/20 text-primary 
                             px-8 py-4 rounded-2xl font-semibold text-lg transition-all group-hover:scale-105">
                Start Analysis → <ArrowRight className="w-5 h-5 group-hover:translate-x-1" />
              </div>
            </div>
          </Link>

          {/* CSV Card - SAME Hourly style */}
          <Link to="/daily/csv" className="group">
            <div className="glass-card h-[420px] p-10 rounded-3xl flex flex-col items-center justify-center 
                           text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 
                           border border-secondary/20 group-hover:border-secondary/40">
              
              <div className="w-24 h-24 bg-secondary/20 rounded-3xl flex items-center justify-center mb-8 
                             border-2 border-dashed border-secondary/30 group-hover:bg-secondary/30 transition-all">
                <Upload className="w-12 h-12 text-secondary" />
              </div>
              
              <h2 className="text-3xl font-bold text-foreground mb-6 group-hover:text-secondary transition-colors">
                CSV Upload
              </h2>
              
              <p className="text-lg text-muted-foreground mb-10 leading-relaxed max-w-md">
                Upload historical data for accurate 7/14/30 day demand forecasts
              </p>
              
              <div className="inline-flex items-center gap-3 bg-secondary/10 hover:bg-secondary/20 text-secondary 
                             px-8 py-4 rounded-2xl font-semibold text-lg transition-all group-hover:scale-105">
                Upload Data → <ArrowRight className="w-5 h-5 group-hover:translate-x-1" />
              </div>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default DailyLanding;
