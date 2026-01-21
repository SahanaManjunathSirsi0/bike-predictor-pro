import React, { useState, ChangeEvent } from "react";
import { ArrowLeft, Upload, Download, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";

interface DailyPoint {
  date: string;
  demand: number;
}

export default function DailyCSVP() {
  const [file, setFile] = useState<File | null>(null);
  const [csvData, setCsvData] = useState<DailyPoint[]>([]);
  const [totalDemand, setTotalDemand] = useState(0);
  const [peakDay, setPeakDay] = useState<string>("");
  const [avgDemand, setAvgDemand] = useState(0);

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result;
      if (typeof result !== "string") return; // TS-safe

      const lines = result
        .split("\n")
        .map((l) => l.trim())
        .filter((l) => l.length > 0);

      // Expect header: date,demand,weather,temp,humidity
      const dataLines = lines.slice(1);

      const parsed: DailyPoint[] = dataLines
        .map((line) => {
          const parts = line.split(",");
          if (parts.length < 2) return null;
          const date = parts[0]?.trim();
          const demand = parseInt(parts[1]?.trim() || "0", 10);
          if (!date || Number.isNaN(demand)) return null;
          return { date, demand };
        })
        .filter((row): row is DailyPoint => row !== null);

      if (parsed.length === 0) {
        setCsvData([]);
        setTotalDemand(0);
        setAvgDemand(0);
        setPeakDay("");
        return;
      }

      setCsvData(parsed);

      const total = parsed.reduce((sum, row) => sum + row.demand, 0);
      const avg = total / parsed.length;
      const peak = parsed.reduce(
        (max, row) => (row.demand > max.demand ? row : max),
        parsed[0]
      );

      setTotalDemand(total);
      setAvgDemand(Math.round(avg));
      setPeakDay(peak.date);
    };

    reader.readAsText(selectedFile);
  };

  const downloadSample = () => {
    const data = `date,demand,weather,temp,humidity
2026-01-01,1250,sunny,22,65
2026-01-02,980,rainy,18,80
2026-01-03,1450,sunny,25,55
2026-01-04,1120,cloudy,20,70
2026-01-05,1670,sunny,24,60`;
    const blob = new Blob([data], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "demo.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const maxDemand =
    csvData.length > 0 ? Math.max(...csvData.map((d) => d.demand)) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Back link */}
        <Link
          to="/daily"
          className="inline-flex items-center gap-3 text-white/80 hover:text-white mb-12 p-4 rounded-2xl hover:bg-white/10 transition-all"
        >
          <ArrowLeft className="w-6 h-6" />
          <span className="font-semibold">Back to Daily</span>
        </Link>

        {/* Title */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black bg-gradient-to-r from-emerald-400 via-green-400 to-emerald-500 bg-clip-text text-transparent mb-4">
            Daily Prediction
          </h1>
          <p className="text-xl text-slate-300">
            Real daily demand derived from uploaded operational data
          </p>
        </div>

        {/* Upload section */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-12 border border-white/20 mb-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-green-500 rounded-2xl flex items-center justify-center shadow-2xl">
                <Download className="w-12 h-12 text-white" />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-white mb-2">
                  Upload Demand Data
                </h3>
                <p className="text-lg text-slate-300">
                  Click to upload your daily CSV dataset
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="bg-white/20 p-4 rounded-2xl border-2 border-dashed border-emerald-400/50 hover:border-emerald-400 cursor-pointer">
                <input
                  id="dailyFileInput"
                  type="file"
                  accept=".csv"
                  className="hidden"
                  onChange={handleFileUpload}
                />
                <label
                  htmlFor="dailyFileInput"
                  className="cursor-pointer flex items-center gap-3 px-4 py-2"
                >
                  <Upload className="w-6 h-6 text-emerald-300" />
                  <span className="font-semibold text-white">
                    {file ? `✅ ${file.name}` : "Choose CSV"}
                  </span>
                </label>
              </div>

              <button
                onClick={downloadSample}
                className="bg-gradient-to-r from-blue-600 to-emerald-600 text-white px-6 py-3 rounded-2xl font-bold shadow-2xl hover:shadow-3xl hover:scale-105 transition-all text-sm"
              >
                📥 Download demo.csv
              </button>
            </div>
          </div>

          {file && (
            <p className="text-center mt-4 text-lg font-bold text-emerald-400 bg-emerald-500/20 p-4 rounded-2xl">
              Dataset loaded ✅
            </p>
          )}
        </div>

        {/* Metrics */}
        {csvData.length > 0 && (
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 text-center">
              <div className="text-2xl font-bold text-emerald-400 mb-1">
                {peakDay || "-"}
              </div>
              <div className="text-xl font-black text-white mb-1">
                Peak Day
              </div>
              <div className="text-sm text-slate-300">
                {maxDemand.toLocaleString()} rentals
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 text-center">
              <div className="text-3xl font-black text-white mb-1">
                {totalDemand.toLocaleString()}
              </div>
              <div className="text-xl font-bold text-slate-300">
                Total Demand
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 text-center">
              <div className="text-3xl font-bold text-blue-400 mb-1">
                {avgDemand}
              </div>
              <div className="text-xl font-bold text-slate-300">
                Avg Daily Demand
              </div>
            </div>
          </div>
        )}

        {/* “Graph” – bar chart using divs (no Chart.js, no TS errors) */}
        {csvData.length > 0 && (
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-12 border border-white/20 mb-16">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                <BarChart3 className="w-7 h-7" />
                Daily Demand Curve
              </h3>
              <span className="text-sm text-slate-400">From CSV Data</span>
            </div>

            <div className="h-80 bg-white/5 rounded-2xl p-6 border border-white/10 flex items-end gap-2 overflow-x-auto">
              {csvData.map((point) => {
                const heightPct =
                  maxDemand > 0 ? (point.demand / maxDemand) * 100 : 0;
                return (
                  <div
                    key={point.date}
                    className="flex flex-col items-center justify-end min-w-[40px]"
                  >
                    <div
                      className="w-8 rounded-t-xl bg-emerald-400 shadow-lg"
                      style={{ height: `${heightPct}%` }}
                      title={`${point.date}: ${point.demand} rentals`}
                    />
                    <span className="mt-2 text-xs text-slate-200">
                      {point.date.slice(5)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Insight */}
        {csvData.length > 0 && (
          <div className="bg-gradient-to-r from-emerald-500/10 to-green-500/10 p-8 rounded-3xl border border-emerald-400/30">
            <h4 className="text-lg font-bold text-emerald-300 mb-2">
              Operational Insight
            </h4>
            <p className="text-base text-white">
              Peak demand occurs on{" "}
              <span className="font-semibold">{peakDay}</span> with{" "}
              <span className="font-semibold">
                {maxDemand.toLocaleString()} rentals
              </span>
              . Consider reallocating bikes and staffing before this day.
            </p>
          </div>
        )}

        {/* AI counter */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-3 bg-white/10 p-4 rounded-2xl backdrop-blur-xl">
            <span className="text-2xl font-bold text-emerald-400">AI</span>
            <span className="text-lg text-slate-400">1</span>
          </div>
        </div>
      </div>
    </div>
  );
}
