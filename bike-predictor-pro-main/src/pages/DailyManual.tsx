import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import PredictionChart from "@/components/PredictionChart";
import { Calendar, Thermometer } from "lucide-react";

interface DailyManualProps {
  onLogout: () => void;
}

const DailyManual = ({ onLogout }: DailyManualProps) => {
  const [formData, setFormData] = useState({
    month: "june",
    season: "summer",
    temperature: 25,
    forecastDays: 7
  });
  const [showResults, setShowResults] = useState(false);
  const [chartData, setChartData] = useState([]);

  const handleGenerate = () => {
    const days = Array.from({ length: formData.forecastDays }, (_, i) => ({
      label: `Day ${i + 1}`,
      value: Math.round(1200 + (formData.temperature * 40) + (i * 80))
    }));
    setChartData(days);
    setShowResults(true);
  };

  const peakDay = chartData.length > 0 
    ? chartData.reduce((max, curr) => curr.value > max.value ? curr : max)
    : { label: "Day 7", value: 2800 };

  const totalDemand = chartData.reduce((sum, day) => sum + day.value, 0);
  const avgDaily = Math.round(totalDemand / formData.forecastDays);

  return (
    <div className="min-h-screen bg-background"> {/* SAME as HourlyManual */}
      <Navbar onLogout={onLogout} />
      
      <main className="container mx-auto px-4 py-6 pb-24">
        {/* Header - EXACT Hourly style */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl glass-card neon-blue">
              <Calendar className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tight text-foreground">Daily Prediction</h1>
              <p className="text-muted-foreground">Multi-day demand forecasting for optimized operations</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8"> {/* SAME layout */}
          
          {/* Parameters - SAME Hourly style */}
          <div className="lg:col-span-1 space-y-6">
            <div className="glass-card rounded-2xl p-8">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-foreground">
                📅 Daily Parameters
              </h2>

              {/* Month */}
              <div className="space-y-2 mb-6">
                <label className="text-sm font-semibold text-foreground block mb-2">Month</label>
                <select 
                  name="month" 
                  value={formData.month} 
                  onChange={(e) => setFormData({...formData, month: e.target.value})}
                  className="w-full glass-card p-4 rounded-xl text-foreground"
                >
                  <option value="january">January ❄️</option>
                  <option value="june">June ☀️</option>
                  <option value="december">December ❄️</option>
                </select>
              </div>

              {/* Season */}
              <div className="space-y-2 mb-6">
                <label className="text-sm font-semibold text-foreground block mb-2">Season</label>
                <select 
                  name="season" 
                  value={formData.season} 
                  onChange={(e) => setFormData({...formData, season: e.target.value})}
                  className="w-full glass-card p-4 rounded-xl text-foreground"
                >
                  <option value="spring">🌸 Spring</option>
                  <option value="summer">☀️ Summer</option>
                  <option value="fall">🍂 Fall</option>
                  <option value="winter">❄️ Winter</option>
                </select>
              </div>

              {/* Temperature */}
              <div className="space-y-2 mb-8">
                <label className="text-sm font-semibold text-foreground block mb-2">Avg Temperature</label>
                <div className="relative">
                  <input 
                    type="range" 
                    name="temperature"
                    min="10" max="40" 
                    value={formData.temperature}
                    onChange={(e) => setFormData({...formData, temperature: +e.target.value})}
                    className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 text-lg font-bold text-primary">
                    {formData.temperature}°C
                  </span>
                </div>
              </div>

              {/* Forecast Days */}
              <div className="space-y-2 mb-8">
                <label className="text-sm font-semibold text-foreground block mb-2">Forecast Days</label>
                <select 
                  value={formData.forecastDays} 
                  onChange={(e) => setFormData({...formData, forecastDays: +e.target.value})}
                  className="w-full glass-card p-4 rounded-xl text-foreground"
                >
                  <option value={7}>7 Days</option>
                  <option value={14}>14 Days</option>
                  <option value={30}>30 Days</option>
                </select>
              </div>

              <button
                onClick={handleGenerate}
                className="w-full glass-card hover:glass-card-hover p-6 rounded-2xl font-bold text-lg 
                          bg-gradient-to-r from-primary/10 to-secondary/10 border-2 border-primary/20 
                          hover:border-primary/40 transition-all duration-300"
              >
                Generate Forecast
              </button>
            </div>
          </div>

          {/* Results - EXACT Hourly style */}
          <div className="lg:col-span-2 space-y-6">
            {!showResults ? (
              <div className="glass-card rounded-2xl p-16 text-center animate-slide-up">
                <div className="w-24 h-24 glass-card rounded-3xl flex items-center justify-center mx-auto mb-8 opacity-50">
                  <Calendar className="w-12 h-12 text-primary/50" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-foreground">Ready for Analysis</h3>
                <p className="text-muted-foreground text-lg">Configure parameters and generate your daily forecast</p>
              </div>
            ) : (
              <>
                <div className="glass-card rounded-2xl p-6 animate-slide-up">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-foreground">
                    📊 {formData.forecastDays}-Day Demand Forecast
                  </h3>
                  <PredictionChart data={chartData} type="line" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="glass-card p-6 text-center">
                    <p className="text-sm text-muted-foreground mb-2">Peak Day</p>
                    <p className="text-3xl font-black text-primary">{peakDay.label}</p>
                    <p className="text-2xl font-bold">{peakDay.value} rentals</p>
                  </div>
                  <div className="glass-card p-6 text-center">
                    <p className="text-sm text-muted-foreground mb-2">Total Demand</p>
                    <p className="text-3xl font-bold">{totalDemand.toLocaleString()}</p>
                  </div>
                  <div className="glass-card p-6 text-center">
                    <p className="text-sm text-muted-foreground mb-2">Avg Daily</p>
                    <p className="text-3xl font-bold">{avgDaily}</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DailyManual;
