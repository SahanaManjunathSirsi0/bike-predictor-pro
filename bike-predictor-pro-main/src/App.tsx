import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import HourlyLanding from "./pages/HourlyLanding";
import HourlyCSV from "./pages/HourlyCSV";
import HourlyManual from "./pages/HourlyManual";
import DailyLanding from "./pages/DailyLanding";
import DailyManual from "./pages/DailyManual";
import ReviewPage from "./pages/ReviewPage";
import NotFound from "./pages/NotFound";
import BikeRental from "./pages/BikeRental";
import DailyCSVP from "./pages/DailyCSVP";  // ✅ NEW IMPORT

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => setIsAuthenticated(true);
  const handleLogout = () => setIsAuthenticated(false);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route
              path="/dashboard"
              element={
                isAuthenticated ? (
                  <Dashboard onLogout={handleLogout} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            
            {/* HOURLY */}
            <Route
              path="/hourly"
              element={
                isAuthenticated ? <HourlyLanding onLogout={handleLogout} /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/hourly/csv"
              element={
                isAuthenticated ? <HourlyCSV onLogout={handleLogout} /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/hourly/manual"
              element={
                isAuthenticated ? <HourlyManual onLogout={handleLogout} /> : <Navigate to="/login" />
              }
            />

            {/* DAILY */}
            <Route
              path="/daily"
              element={
                isAuthenticated ? <DailyLanding onLogout={handleLogout} /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/daily/manual"
              element={
                isAuthenticated ? <DailyManual onLogout={handleLogout} /> : <Navigate to="/login" />
              }
            />
            
            {/* BIKE RENTAL - Public */}
            <Route path="/rent" element={<BikeRental />} />
            
            {/* ✅ DAILY CSV - YOUR GREEN PAGE (TS ERROR FIXED) */}
            <Route
              path="/daily/csv"
              element={
                isAuthenticated ? <DailyCSVP /> : <Navigate to="/login" />
              }
            />

            {/* REVIEWS */}
            <Route
              path="/reviews"
              element={
                isAuthenticated ? <ReviewPage onLogout={handleLogout} /> : <Navigate to="/login" />
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
