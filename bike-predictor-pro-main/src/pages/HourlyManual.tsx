import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import PredictionChart from "@/components/PredictionChart";
import InsightCard from "@/components/InsightCard";
import Chatbot from "@/components/Chatbot";
import { Sun, Cloud, CloudRain, Thermometer, Droplets, Wind } from "lucide-react";

interface HourlyManualProps {
  onLogout: () => void;
}

const HourlyManual = ({ onLogout }: HourlyManualProps) => {
  const [formData, setFormData] = useState({
    season: "spring",
    weather: "clear",
    workingDay: true,
    temperature: 22,
    humidity: 60,
    windSpeed: 10
  });
  const [showResults, setShowResults] = useState(false);
  const [chartData, setChartData] = useState([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as any;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleGenerate = () => {
    const hours = Array.from({ length: 24 }, (_, i) => ({
      label: `${i.toString().padStart(2, '0')}:00`,
      value: generateHourlyDemand(i, formData)
    }));
    setChartData(hours);
    setShowResults(true);
  };

  const generateHourlyDemand = (hour: number, data: any) => {
    let baseDemand = 80 + data.temperature;
    
    const seasonMultipliers = { spring: 1.1, summer: 1.4, fall: 0.95, winter: 0.75 };
    baseDemand *= seasonMultipliers[data.season as keyof typeof seasonMultipliers];

    const weatherMultipliers = { clear: 1.25, cloudy: 1.0, rainy: 0.65, heavyRain: 0.35 };
    baseDemand *= weatherMultipliers[data.weather as keyof typeof weatherMultipliers];

    baseDemand *= (1 - (data.humidity - 40) * 0.005);
    baseDemand *= (1 - data.windSpeed * 0.015);

    if (data.workingDay && (hour === 8 || hour === 18)) baseDemand *= 2.3;
    if (data.workingDay && (hour >= 7 && hour <= 9 || hour >= 17 && hour <= 19)) baseDemand *= 1.6;
    if (!data.workingDay && (hour === 12 || hour === 16)) baseDemand *= 2.1;

    return Math.max(5, Math.round(baseDemand));
  };

  const peakHour = chartData.length > 0 
    ? chartData.reduce((max: any, curr: any) => curr.value > max.value ? curr : max)
    : { label: "18:00", value: 0 };
  
  const totalDemand = chartData.reduce((sum: number, hour: any) => sum + hour.value, 0);
  const avgHourly = Math.round(totalDemand / 24);

  return (
    <div className="min-h-screen bg-background">
      <Navbar onLogout={onLogout} />
      
      <main className="container mx-auto px-4 py-6 pb-24">
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl glass-card neon-blue">
              <Thermometer className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tight">Hourly Prediction</h1>
              <p className="text-muted-foreground">Configure environmental parameters to simulate hourly demand</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div className="glass-card rounded-2xl p-8">
              <h2 className="text-xl font-bold mb-8 flex items-center gap-2">
                🌡️ Input Parameters
              </h2>

              <div className="space-y-2 mb-6">
                <label className="text-sm font-semibold text-foreground block mb-2">Season</label>
                <select name="season" value={formData.season} onChange={handleInputChange} className="w-full glass-card p-4 rounded-xl text-foreground">
                  <option value="spring">🌸 Spring</option>
                  <option value="summer">☀️ Summer</option>
                  <option value="fall">🍂 Fall</option>
                  <option value="winter">❄️ Winter</option>
                </select>
              </div>

              <div className="space-y-2 mb-6">
                <label className="text-sm font-semibold text-foreground block mb-2">Weather Condition</label>
                <select name="weather" value={formData.weather} onChange={handleInputChange} className="w-full glass-card p-4 rounded-xl text-foreground">
                  <option value="clear">☀️ Clear</option>
                  <option value="cloudy">☁️ Cloudy</option>
                  <option value="rainy">🌧️ Rainy</option>
                  <option value="heavyRain">⛈️ Heavy Rain</option>
                </select>
              </div>

              <div className="space-y-2 mb-6">
                <label className="text-sm font-semibold text-foreground block mb-2">Working Day</label>
                <div className="flex items-center space-x-4 p-3 bg-muted/30 rounded-xl">
                  <label className="flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-muted">
                    <input type="radio" name="workingDay" checked={formData.workingDay} onChange={() => setFormData(prev => ({...prev, workingDay: true}))} className="w-5 h-5 text-primary bg-background rounded" />
                    <span className="text-sm font-medium">Yes - Weekday</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-muted">
                    <input type="radio" name="workingDay" checked={!formData.workingDay} onChange={() => setFormData(prev => ({...prev, workingDay: false}))} className="w-5 h-5 text-primary bg-background rounded" />
                    <span className="text-sm font-medium">No - Weekend</span>
                  </label>
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <label className="text-sm font-semibold text-foreground block mb-2">Temperature</label>
                <div className="relative">
                  <input type="range" name="temperature" min="10" max="40" value={formData.temperature} onChange={handleInputChange} className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary" />
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 text-lg font-bold text-primary">{formData.temperature}°C</span>
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <label className="text-sm font-semibold text-foreground block mb-2">Humidity</label>
                <div className="relative">
                  <input type="range" name="humidity" min="20" max="90" value={formData.humidity} onChange={handleInputChange} className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary" />
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 text-lg font-bold text-primary">{formData.humidity}%</span>
                </div>
              </div>

              <div className="space-y-2 mb-8">
                <label className="text-sm font-semibold text-foreground block mb-2">Wind Speed</label>
                <div className="relative">
                  <input type="range" name="windSpeed" min="0" max="30" value={formData.windSpeed} onChange={handleInputChange} className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary" />
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 text-lg font-bold text-primary">{formData.windSpeed} km/h</span>
                </div>
              </div>

              <button onClick={handleGenerate} className="w-full glass-card hover:glass-card-hover p-6 rounded-2xl font-bold text-lg bg-gradient-to-r from-primary/10 to-secondary/10 border-2 border-primary/20 hover:border-primary/40 transition-all duration-300">
                Generate Forecast
              </button>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            {!showResults ? (
              <div className="glass-card rounded-2xl p-16 text-center animate-slide-up">
                <div className="w-24 h-24 glass-card rounded-3xl flex items-center justify-center mx-auto mb-8 opacity-50">
                  <Thermometer className="w-12 h-12 text-primary/50" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-foreground">Ready for Analysis</h3>
                <p className="text-muted-foreground text-lg">Configure parameters and let our AI generate your hourly forecast</p>
              </div>
            ) : (
              <>
                <div className="glass-card rounded-2xl p-6 animate-slide-up">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold flex items-center gap-2">Hourly Demand Curve</h3>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10">
                      <Sun className="w-4 h-4 text-primary" />
                      <span className="font-medium text-primary capitalize">{formData.weather}</span>
                    </div>
                  </div>
                  <PredictionChart data={chartData} type="area" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="glass-card p-6 text-center">
                    <p className="text-sm text-muted-foreground mb-2">Peak Hour</p>
                    <p className="text-3xl font-black text-primary">{peakHour.label}</p>
                    <p className="text-2xl font-bold">{peakHour.value} rentals</p>
                  </div>
                  <div className="glass-card p-6 text-center">
                    <p className="text-sm text-muted-foreground mb-2">Total Daily</p>
                    <p className="text-3xl font-bold">{totalDemand.toLocaleString()}</p>
                  </div>
                  <div className="glass-card p-6 text-center">
                    <p className="text-sm text-muted-foreground mb-2">Avg Hourly</p>
                    <p className="text-3xl font-bold">{avgHourly}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <InsightCard
                    type="peak"
                    title="Peak Period Alert"
                    description={`High demand expected at ${peakHour.label} with ~${peakHour.value} predicted rentals. Weather: ${formData.weather}, Humidity: ${formData.humidity}%`}
                  />
                  <InsightCard
                    type="tip"  // ✅ FIXED: "pattern" → "tip"
                    title="AI Recommendation"
                    description={`Optimal conditions detected (${formData.season}, ${formData.weather}). ${formData.workingDay ? 'Commuter rush' : 'Weekend leisure'} patterns expected.`}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      <Chatbot 
        context={{
          page: "Hourly Manual Prediction",
          parameters: formData,
          showResults,
          peakHour,
          totalDemand,
          instruction: "Explain hourly predictions with weather, humidity, wind impact"
        }} 
      />
    </div>
  );
};

export default HourlyManual;
