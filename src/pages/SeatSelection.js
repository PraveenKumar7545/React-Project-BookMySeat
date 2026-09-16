// src/pages/SeatSelection.js
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { seatLayout, bookedSeats } from '../data/seats';
import Seat from '../components/Seat';

function SeatSelection() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('cineseat_booking');
    if (saved) {
      setBooking(JSON.parse(saved));
    }
  }, []);

  const toggleSeat = (seatId) => {
    if (bookedSeats.includes(seatId)) return;

    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const getSeatStatus = (seatId) => {
    if (bookedSeats.includes(seatId)) return 'booked';
    if (selectedSeats.includes(seatId)) return 'selected';
    return 'available';
  };

  const getSeatPrice = (seatId) => {
    const row = seatId.charAt(0);
    const rowInfo = seatLayout.find((r) => r.row === row);
    if (!rowInfo || !booking) return 0;

    return booking.prices[rowInfo.type] || 0;
  };

  const totalAmount = selectedSeats.reduce((sum, seatId) => {
    return sum + getSeatPrice(seatId);
  }, 0);

  const handleContinue = () => {
    if (selectedSeats.length === 0) {
      alert('Please select at least one seat');
      return;
    }

    // Update booking data
    const updatedBooking = {
      ...booking,
      seats: selectedSeats,
      ticketAmount: totalAmount,
    };

    localStorage.setItem('cineseat_booking', JSON.stringify(updatedBooking));
    navigate(`/snacks/${id}`);
  };

  if (!booking) {
    return (
      <div className="flex-grow flex items-center justify-center p-6 text-center">
        <div>
          <p className="text-xl text-black mb-4">No booking data found</p>
          <Link to="/movies" className="text-black hover:underline">
            ← Go to Movies
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-grow py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <Link to={`/theatre/${id}`} className="text-black hover:text-gray-700 text-sm mb-4 inline-block">
            ← Back to Shows
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-black mb-2">
            Select Your Seats
          </h1>
          <p className="text-black">
            {booking.movie?.title} • {booking.theatre?.name} • {booking.showTime}
          </p>
        </div>

        {/* Screen */}
        <div className="mb-10">
          <div className="bg-gradient-to-r from-purple-600/30 via-purple-400/50 to-purple-600/30 h-3 rounded-full mb-3"></div>
          <p className="text-center text-sm text-black tracking-widest">SCREEN</p>
        </div>

        {/* Seat Layout */}
        <div className="flex flex-col items-center gap-3 mb-10 overflow-x-auto pb-4">
          {seatLayout.map((row) => (
            <div key={row.row} className="flex items-center gap-2">
              <span className="w-6 text-black font-medium">{row.row}</span>
              <div className="flex gap-2">
                {Array.from({ length: row.seats }, (_, i) => {
                  const seatNumber = i + 1;
                  const seatId = `${row.row}${seatNumber}`;
                  return (
                    <Seat
                      key={seatId}
                      seatId={seatId}
                      status={getSeatStatus(seatId)}
                      onClick={() => toggleSeat(seatId)}
                    />
                  );
                })}
              </div>
              <span className="w-6 text-black font-medium">{row.row}</span>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-6 mb-10 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-green-500"></div>
            <span className="text-black">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-purple-600"></div>
            <span className="text-black">Selected</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-gray-600"></div>
            <span className="text-black">Booked</span>
          </div>
        </div>

        {/* Selected Summary */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-black text-sm">Selected Seats</p>
              <p className="text-black font-medium text-lg">
                {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None'}
              </p>
            </div>
            <div className="text-right">
              <p className="text-black text-sm">Ticket Amount</p>
              <p className="text-2xl font-bold text-black">₹{totalAmount}</p>
            </div>
          </div>
        </div>

        {/* Continue Button */}
            <button 
            onClick={handleContinue} 
            disabled={selectedSeats.length === 0} 
            className={`w-full sm:w-auto font-semibold px-10 py-4 rounded-xl transition-all shadow-lg ${
                selectedSeats.length === 0 
                ? 'bg-gray-600 cursor-not-allowed text-gray-300' 
                : 'bg-black hover:bg-gray-800 text-white hover:shadow-gray-500/40' 
            }`} 
            >
            Continue to Snacks 
            </button>
      </div>
    </div>
  );
}

export default SeatSelection;