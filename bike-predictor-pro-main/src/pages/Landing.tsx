import { Link } from 'react-router-dom'; // Remove if not using React Router

export default function Landing() {
  return (
    <div style={{ 
      padding: "40px 20px", 
      maxWidth: "1200px", 
      margin: "0 auto",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      textAlign: "center"
    }}>
      {/* HERO SECTION */}
      <div style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "white",
        padding: "80px 40px",
        borderRadius: "25px",
        marginBottom: "60px"
      }}>
        <h1 style={{ 
          fontSize: "56px", 
          margin: 0, 
          fontWeight: "bold",
          lineHeight: "1.2"
        }}>
          🚀 RideWise - Smart Bike Rentals
        </h1>
        <p style={{ 
          fontSize: "28px", 
          margin: "30px 0 50px 0",
          opacity: 0.95
        }}>
          AI-Powered Demand Prediction + Instant Bike Booking
        </p>
        <Link 
          to="/rent"
          style={{
            display: 'inline-block',
            padding: '20px 50px',
            background: '#10b981',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '50px',
            fontSize: '22px',
            fontWeight: 'bold',
            boxShadow: '0 20px 40px rgba(16,185,129,0.4)'
          }}
        >
          🏍️ RENT A BIKE NOW
        </Link>
      </div>

      {/* NAVIGATION BUTTONS */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '30px', 
        marginBottom: '60px',
        maxWidth: '1000px',
        marginLeft: 'auto',
        marginRight: 'auto'
      }}>
        <Link to="/daily" style={navButtonStyle}>
          📊 Daily CSV Upload
          <div style={{ fontSize: '14px', opacity: 0.8, marginTop: '8px' }}>
            Upload demand data & get predictions
          </div>
        </Link>
        
        <Link to="/rent" style={navButtonStyle}>
          🏍️ Instant Bike Rental
          <div style={{ fontSize: '14px', opacity: 0.8, marginTop: '8px' }}>
            Book bikes with live availability
          </div>
        </Link>
        
        <Link to="/predict" style={navButtonStyle}>
          🔮 AI Demand Predictor
          <div style={{ fontSize: '14px', opacity: 0.8, marginTop: '8px' }}>
            See tomorrow's demand forecast
          </div>
        </Link>
      </div>

      {/* Sangli Location */}
      <div style={{
        background: '#f8fafc',
        padding: '40px',
        borderRadius: '20px',
        border: '2px solid #e2e8f0'
      }}>
        <h2 style={{ fontSize: '32px', color: '#1e293b', marginBottom: '20px' }}>
          📍 Serving Sangli & Maharashtra
        </h2>
        <p style={{ fontSize: '20px', color: '#475569', lineHeight: '1.6' }}>
          Smart rentals powered by AI demand prediction. 
          Book during low-demand periods for best availability!
        </p>
      </div>
    </div>
  );
}

const navButtonStyle = {
  padding: '30px 20px',
  background: 'white',
  borderRadius: '20px',
  textDecoration: 'none',
  color: '#1f2937',
  fontSize: '24px',
  fontWeight: 'bold',
  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
  transition: 'all 0.3s',
  border: '3px solid transparent',
  display: 'block' as const
} as const;
