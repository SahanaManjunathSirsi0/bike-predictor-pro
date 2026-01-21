import React, { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import PredictionChart from "@/components/PredictionChart";
import InsightCard from "@/components/InsightCard";
import Chatbot from "@/components/Chatbot";
import CSVUpload from "@/components/CSVUpload";
import { useCSVUpload } from "@/hooks/useCSVUpload";

import {
  Clock,
  Brain,
  Zap,
  Sun,
  Cloud,
  CloudRain,
} from "lucide-react";

interface HourlyPredictionProps {
  onLogout: () => void;
}

const HourlyPrediction = ({ onLogout }: HourlyPredictionProps) => {
  const {
    data: parsedCSV,
    isLoading: csvLoading,
    fileName,
    handleFileUpload,
    clearData,
  } = useCSVUpload();

  /* ---------- Derived REAL data from CSV ---------- */

  const hourlyChartData = useMemo(() => {
    if (!parsedCSV?.hourly_demand) return [];
    return Object.entries(parsedCSV.hourly_demand).map(([hour, value]) => ({
      label: `${hour}:00`,
      value: Number(value),
    }));
  }, [parsedCSV]);

  const peakHour = parsedCSV?.peak_hour;
  const totalDemand = parsedCSV?.total_demand;
  const avgHourly =
    hourlyChartData.length > 0
      ? Math.round(totalDemand / hourlyChartData.length)
      : 0;

  /* ---------- Weather icon (optional visual only) ---------- */
  const WeatherIcon = Sun;

  return (
    <div className="min-h-screen bg-background">
      <Navbar onLogout={onLogout} />

      <main className="container mx-auto px-4 py-6 pb-24">
        {/* Header */}
        <div className="mb-6 animate-fade-in">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 rounded-xl glass-card neon-blue">
              <Clock className="w-5 h-5 text-primary" />
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight">
              Hourly Prediction
            </h1>
          </div>
          <p className="text-muted-foreground">
            Real hourly demand derived from uploaded operational data
          </p>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT COLUMN */}
          <div className="lg:col-span-1 space-y-5">
            {/* CSV Upload */}
            <div className="glass-card rounded-2xl p-6 animate-slide-up">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Brain className="w-4 h-4 text-primary" />
                Upload Demand Data
              </h2>

              <CSVUpload
                onFileUpload={handleFileUpload}
                fileName={fileName}
                isLoading={csvLoading}
                onClear={clearData}
              />
            </div>

            {/* Stats */}
            {parsedCSV && (
              <div className="grid grid-cols-2 gap-4 animate-slide-up">
                <div className="glass-card rounded-xl p-4 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Peak Hour</p>
                  <p className="text-2xl font-bold text-primary">
                    {peakHour.hour}:00
                  </p>
                  <p className="text-xs text-secondary mt-1">
                    {peakHour.demand} rentals
                  </p>
                </div>

                <div className="glass-card rounded-xl p-4 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Total Demand</p>
                  <p className="text-2xl font-bold">
                    {totalDemand.toLocaleString()}
                  </p>
                </div>

                <div className="glass-card rounded-xl p-4 text-center col-span-2">
                  <p className="text-xs text-muted-foreground mb-1">
                    Avg Hourly Demand
                  </p>
                  <p className="text-2xl font-bold">{avgHourly}</p>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN */}
          <div className="lg:col-span-2 space-y-5">
            {!parsedCSV ? (
              <div className="glass-card rounded-2xl p-12 text-center animate-slide-up">
                <div className="w-20 h-20 glass-card rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Clock className="w-10 h-10 text-primary/50" />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  Awaiting Dataset
                </h3>
                <p className="text-muted-foreground">
                  Upload a CSV file to visualize hourly demand
                </p>
              </div>
            ) : (
              <>
                {/* Chart */}
                <div className="glass-card rounded-2xl p-5 animate-slide-up">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold">
                      Hourly Demand Curve
                    </h3>
                    <div className="flex items-center gap-2 text-sm px-3 py-1 rounded-full bg-muted/50">
                      <WeatherIcon className="w-4 h-4 text-primary" />
                      <span className="text-muted-foreground">
                        From CSV Data
                      </span>
                    </div>
                  </div>

                  <PredictionChart data={hourlyChartData} type="area" />
                </div>

                {/* Insight */}
                <InsightCard
                  type="peak"
                  title="Operational Insight"
                  description={`Peak demand occurs at ${peakHour.hour}:00 with ${peakHour.demand} rentals. Consider reallocating bikes before this hour.`}
                />
              </>
            )}
          </div>
        </div>
      </main>

      {/* CHATBOT — CONTEXT DRIVEN */}
      <Chatbot
        context={{
          page: "Hourly Prediction",
          dataAvailable: Boolean(parsedCSV),
          peakHour: parsedCSV?.peak_hour,
          totalDemand: parsedCSV?.total_demand,
          hours: hourlyChartData.length,
          instruction:
            "Explain hourly demand patterns based only on uploaded CSV data.",
        }}
      />
    </div>
  );
};

export default HourlyPrediction;
