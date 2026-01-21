import React, { useState, FormEvent } from 'react';
import { ArrowLeft, Calendar, Clock, Phone, User, Bike, CheckCircle, Receipt, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BikeType {
  id: number;
  name: string;
  price: number;
  available: number;
  image: string;
}

const BIKE_TYPES: BikeType[] = [
  { id: 1, name: "Gearless Scooty", price: 50, available: 8, image: "scooter.png" },
  { id: 2, name: "Electric Bike", price: 80, available: 5, image: "electric.png" },
  { id: 3, name: "Sports Bike", price: 150, available: 3, image: "sports.png" },
  { id: 4, name: "Cycle", price: 20, available: 12, image: "cycle.png" }
];

const BikeRental: React.FC = () => {
  const [selectedBike, setSelectedBike] = useState<BikeType | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    pickupDate: '',
    pickupTime: '',
    duration: '1'
  });
  const [showReceipt, setShowReceipt] = useState(false);
  const [bookingData, setBookingData] = useState<any>(null);

  const totalPrice = selectedBike ? selectedBike.price * parseInt(formData.duration) : 0;
  const totalAvailable = BIKE_TYPES.reduce((sum, bike) => sum + bike.available, 0);

  const handleBikeClick = (bike: BikeType) => setSelectedBike(bike);
  
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedBike && formData.name && formData.phone) {
      const booking = {
        ...formData,
        bike: selectedBike,
        total: totalPrice,
        bookingId: 'RIDE' + Date.now().toString().slice(-6),
        timestamp: new Date().toLocaleString()
      };
      setBookingData(booking);
      setShowReceipt(true);
    }
  };

  if (showReceipt) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-8">
        <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full mx-auto border border-gray-200 overflow-hidden">
          {/* Receipt Header */}
          <div className="bg-gradient-to-r from-gray-900 to-slate-800 text-white p-12 text-center border-b border-gray-100">
            <CheckCircle className="w-20 h-20 mx-auto mb-6 text-emerald-400" />
            <h1 className="text-4xl font-bold mb-2">Booking Confirmed</h1>
            <p className="text-xl opacity-90">Receipt #{bookingData?.bookingId}</p>
          </div>

          {/* Receipt Content - PERFECT VISIBILITY */}
          <div className="p-12 space-y-8 bg-gray-50">
            {/* Booking Summary */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Vehicle Details</h3>
                <div className="text-center mb-8">
                  <div className="text-6xl mb-4 mx-auto">
                    {bookingData?.bike.image === 'scooter.png' ? '🏍️' : 
                     bookingData?.bike.image === 'electric.png' ? '⚡' : 
                     bookingData?.bike.image === 'sports.png' ? '🏎️' : '🚲'}
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-2">{bookingData?.bike.name}</h4>
                  <div className="text-3xl font-bold text-gray-900">₹{bookingData?.total}</div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-700">Customer</span>
                    <span className="text-xl font-bold text-gray-900">{bookingData?.name}</span>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-700">Phone</span>
                    <span className="text-xl font-bold text-gray-900">{bookingData?.phone}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Pickup Details */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                <MapPin className="w-8 h-8 text-gray-700" />
                Pickup Information
              </h3>
              <div className="grid md:grid-cols-2 gap-8 text-lg">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <Calendar className="w-6 h-6 text-gray-600" />
                    <span className="text-gray-700 font-semibold">Date:</span>
                  </div>
                  <span className="text-2xl font-bold text-gray-900 bg-gray-100 px-6 py-3 rounded-xl block">{bookingData?.pickupDate}</span>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <Clock className="w-6 h-6 text-gray-600" />
                    <span className="text-gray-700 font-semibold">Time:</span>
                  </div>
                  <span className="text-2xl font-bold text-gray-900 bg-gray-100 px-6 py-3 rounded-xl block">{bookingData?.pickupTime}</span>
                </div>
                <div className="md:col-span-2">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-gray-700 font-semibold">Duration:</span>
                  </div>
                  <span className="text-2xl font-bold text-gray-900 bg-gray-100 px-8 py-4 rounded-xl block">{bookingData?.duration} hour{parseInt(bookingData?.duration) > 1 ? 's' : ''}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-gray-200">
              <button
                type="button"
                onClick={() => setShowReceipt(false)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-4 px-8 rounded-2xl font-bold text-lg transition-all duration-300 border border-gray-300 hover:shadow-md"
              >
                ✏️ Edit Details
              </button>
              <button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-4 px-8 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300">
                📱 Send WhatsApp
              </button>
            </div>

            <div className="text-center py-8 border-t border-gray-200">
              <p className="text-lg text-gray-600 font-semibold">
                Thank you for choosing RideWise. Safe travels.
              </p>
              <p className="text-sm text-gray-500 mt-2">Booking confirmed at {new Date().toLocaleTimeString()}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main Rental Page - PROFESSIONAL NAVY BLUE
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900" style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem' }}>
      {/* Header */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl rounded-3xl p-8 mb-16">
        <div className="flex items-center gap-6">
          <Link 
            to="/dashboard" 
            className="flex items-center gap-3 text-slate-200 hover:text-white p-4 rounded-2xl hover:bg-white/10 transition-all duration-300 font-semibold text-lg"
          >
            <ArrowLeft className="w-6 h-6" />
            Back to Dashboard
          </Link>
          <div className="flex-1 text-center">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-slate-100 via-blue-200 to-slate-100 bg-clip-text text-transparent drop-shadow-2xl">
              Bike Rental Portal
            </h1>
            <p className="text-slate-300 text-xl font-medium mt-2 drop-shadow-lg">
              Real-time availability and instant booking
            </p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-16 items-start max-w-7xl mx-auto">
        
        {/* Bike Selection */}
        <div>
          <div className="flex items-center gap-4 mb-16 pb-8 border-b border-white/10">
            <Bike className="w-12 h-12 text-blue-400" />
            <div>
              <h2 className="text-4xl font-bold text-white drop-shadow-xl">Fleet Availability</h2>
              <div className="text-xl text-slate-300 font-medium mt-2">({totalAvailable} vehicles ready)</div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {BIKE_TYPES.map((bike) => (
              <div
                key={bike.id}
                className={`group cursor-pointer p-12 rounded-3xl border-4 shadow-2xl hover:shadow-3xl transition-all duration-500 backdrop-blur-xl bg-white/5 border-white/20 hover:bg-white/10 hover:border-blue-400/50 hover:shadow-blue-500/20 relative overflow-hidden ${
                  selectedBike?.id === bike.id
                    ? 'ring-4 ring-blue-400/30 scale-[1.02] shadow-blue-500/30'
                    : 'hover:scale-[1.02]'
                }`}
                onClick={() => handleBikeClick(bike)}
              >
                <div className="text-8xl mb-12 group-hover:scale-110 transition-all duration-500 drop-shadow-2xl">
                  {bike.image === 'scooter.png' ? '🏍️' : 
                   bike.image === 'electric.png' ? '⚡' : 
                   bike.image === 'sports.png' ? '🏎️' : '🚲'}
                </div>
                
                <h3 className="text-3xl font-bold text-white mb-12 drop-shadow-2xl group-hover:text-slate-200 transition-all">
                  {bike.name}
                </h3>
                
                <div className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent drop-shadow-2xl mb-12">
                  ₹{bike.price}/hr
                </div>
                
                <div className={`flex items-center justify-center gap-4 text-3xl font-bold py-6 px-12 rounded-3xl backdrop-blur-xl shadow-2xl ${
                  bike.available > 0 
                    ? 'bg-emerald-500/90 text-white border-4 border-emerald-400/50 shadow-emerald-500/25' 
                    : 'bg-gray-500/90 text-white border-4 border-gray-400/50 shadow-gray-500/25'
                }`}>
                  {bike.available > 0 ? '● LIVE' : '● OFFLINE'}
                  <span>{bike.available}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Booking Form */}
        <div>
          <h2 className="text-4xl font-bold text-white mb-16 flex items-center gap-4 justify-center drop-shadow-2xl pb-8 border-b border-white/10">
            <Bike className="w-16 h-16 text-blue-400 drop-shadow-2xl" />
            Secure Booking
          </h2>

          {selectedBike ? (
            <form onSubmit={handleSubmit} className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-4xl shadow-2xl p-12 max-w-2xl mx-auto">
              {/* Selected Bike Summary */}
              <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white p-12 rounded-3xl mb-12 shadow-2xl text-center border border-emerald-400/30">
                <div className="text-7xl mb-8 drop-shadow-2xl">
                  {selectedBike.image === 'scooter.png' ? '🏍️' : 
                   selectedBike.image === 'electric.png' ? '⚡' : 
                   selectedBike.image === 'sports.png' ? '🏎️' : '🚲'}
                </div>
                <h3 className="text-4xl font-bold mb-8 drop-shadow-xl">{selectedBike.name}</h3>
                <div className="text-6xl font-bold mb-8 drop-shadow-2xl">₹{totalPrice}</div>
                <p className="text-2xl opacity-95 drop-shadow-lg">
                  {formData.duration}hr booking
                </p>
              </div>

              {/* Form Fields - PERFECT VISIBILITY */}
              <div className="space-y-10">
                <div>
                  <label className="block text-2xl font-bold text-white mb-8 flex items-center gap-4 drop-shadow-xl">
                    <User className="w-10 h-10 text-blue-300" />
                    Full Name
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Enter full name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full p-10 text-2xl bg-white/80 border-4 border-white/30 rounded-3xl focus:border-blue-400 focus:ring-8 focus:ring-blue-100/50 shadow-2xl hover:shadow-3xl transition-all duration-500 placeholder-slate-600 text-slate-900 font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-2xl font-bold text-white mb-8 flex items-center gap-4 drop-shadow-xl">
                    <Phone className="w-10 h-10 text-blue-300" />
                    Phone Number
                  </label>
                  <input
                    required
                    type="tel"
                    placeholder="Enter phone number"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full p-10 text-2xl bg-white/80 border-4 border-white/30 rounded-3xl focus:border-blue-400 focus:ring-8 focus:ring-blue-100/50 shadow-2xl hover:shadow-3xl transition-all duration-500 placeholder-slate-600 text-slate-900 font-semibold"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-10">
                  <div>
                    <label className="block text-2xl font-bold text-white mb-8 flex items-center gap-4 drop-shadow-xl">
                      <Calendar className="w-10 h-10 text-blue-300" />
                      Pickup Date
                    </label>
                    <input
                      required
                      type="date"
                      value={formData.pickupDate}
                      onChange={(e) => handleInputChange('pickupDate', e.target.value)}
                      className="w-full p-10 text-2xl bg-white/80 border-4 border-white/30 rounded-3xl focus:border-blue-400 focus:ring-8 focus:ring-blue-100/50 shadow-2xl hover:shadow-3xl transition-all duration-500 text-slate-900 font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-2xl font-bold text-white mb-8 flex items-center gap-4 drop-shadow-xl">
                      <Clock className="w-10 h-10 text-blue-300" />
                      Pickup Time
                    </label>
                    <input
                      required
                      type="time"
                      value={formData.pickupTime}
                      onChange={(e) => handleInputChange('pickupTime', e.target.value)}
                      className="w-full p-10 text-2xl bg-white/80 border-4 border-white/30 rounded-3xl focus:border-blue-400 focus:ring-8 focus:ring-blue-100/50 shadow-2xl hover:shadow-3xl transition-all duration-500 text-slate-900 font-semibold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-2xl font-bold text-white mb-8 drop-shadow-xl">Duration</label>
                  <select
                    required
                    value={formData.duration}
                    onChange={(e) => handleInputChange('duration', e.target.value)}
                    className="w-full p-10 text-2xl bg-white/80 border-4 border-white/30 rounded-3xl focus:border-blue-400 focus:ring-8 focus:ring-blue-100/50 shadow-2xl hover:shadow-3xl transition-all duration-500 text-slate-900 font-semibold appearance-none cursor-pointer"
                  >
                    <option value="1">1 Hour (₹{selectedBike.price})</option>
                    <option value="2">2 Hours (₹{selectedBike.price * 2})</option>
                    <option value="4">4 Hours (₹{selectedBike.price * 4})</option>
                    <option value="8">8 Hours (₹{selectedBike.price * 8})</option>
                    <option value="24">Full Day (₹{Math.round(selectedBike.price * 24 * 0.7)})</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white py-14 px-20 rounded-4xl font-bold text-3xl shadow-3xl hover:shadow-4xl hover:-translate-y-3 transition-all duration-500 border-4 border-emerald-500/50 backdrop-blur-xl"
                >
                  🔒 CONFIRM BOOKING
                </button>
              </div>
            </form>
          ) : (
            <div className="backdrop-blur-xl bg-white/5 border-4 border-dashed border-white/20 rounded-4xl p-20 text-center shadow-3xl max-w-2xl mx-auto h-[700px] flex flex-col justify-center">
              <div className="text-9xl mb-12 drop-shadow-3xl">🚲</div>
              <h3 className="text-5xl font-bold text-white mb-8 drop-shadow-3xl">Select Vehicle</h3>
              <p className="text-2xl text-slate-300 mb-16 max-w-lg mx-auto leading-relaxed drop-shadow-xl">
                Choose from our premium fleet to start your booking process
              </p>
              <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-blue-600 rounded-3xl flex items-center justify-center mx-auto shadow-3xl drop-shadow-2xl animate-pulse">
                <Bike className="w-20 h-20 text-white drop-shadow-lg" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BikeRental;
