import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Still redirects to login automatically
    navigate("/login");
  }, [navigate]);

  return (
    <div style={{ 
      padding: "40px", 
      textAlign: "center",
      background: "#f8fafc",
      minHeight: "100vh"
    }}>
      <h1 style={{ fontSize: "48px", color: "#2563eb", marginBottom: "20px" }}>
        🚀 RideWise - Smart Bike Rentals
      </h1>
      <p style={{ fontSize: "24px", color: "#666", marginBottom: "40px" }}>
        AI-Powered Demand Prediction + Instant Bike Booking
      </p>
      
      {/* ✅ BIKE RENTAL BUTTON - NEW */}
      <a 
        href="/rent"
        style={{
          display: "inline-block",
          padding: "20px 50px",
          background: "linear-gradient(45deg, #10b981, #059669)",
          color: "white",
          textDecoration: "none",
          borderRadius: "20px",
          fontSize: "24px",
          fontWeight: "bold",
          boxShadow: "0 15px 35px rgba(16,185,129,0.4)",
          marginBottom: "20px"
        }}
      >
        🏍️ RENT A BIKE NOW → Live Availability!
      </a>
      
      <p style={{ fontSize: "16px", color: "#888" }}>
        Redirecting to admin login in 3 seconds...
      </p>
    </div>
  );
};

export default Index;
