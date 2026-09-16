// src/pages/Ticket.js
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Ticket() {
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('cineseat_booking');
    if (saved) {
      setBooking(JSON.parse(saved));
    }
  }, []);

  if (!booking || !booking.bookingId) {
    return (
      <div className="flex-grow flex items-center justify-center p-6 text-center">
        <div>
          <p className="text-xl text-black mb-4">No ticket found</p>
          <Link to="/movies" className="text-black hover:underline">
            ← Book a Movie
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-grow py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">

        {/* Success Message */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 text-green-400 text-3xl mb-4">
            ✓
          </div>

          <h1 className="text-3xl font-bold text-black mb-2">
            Booking Confirmed!
          </h1>

          <p className="text-black">
            Your digital ticket is ready
          </p>
        </div>

        {/* Ticket Card */}
        <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-200">

          {/* Header */}
          <div className="bg-black px-6 py-5 border-b border-gray-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="BookMySeat"
                className="h-10 w-auto object-contain"
              />
            </div>

            <div className="text-right">
              <p className="text-xs text-white/70">
                Booking ID
              </p>

              <p className="text-white font-mono font-semibold">
                {booking.bookingId}
              </p>
            </div>
          </div>

          {/* Main Content */}
          <div className="p-6">

            {/* Movie Title */}
            <h2 className="text-2xl font-bold text-black mb-1">
              {booking.movie?.title}
            </h2>

            <p className="text-black text-sm mb-6">
              {booking.isSpecialShow
                ? '⭐ FDFS / Special Show'
                : 'Regular Show'}
            </p>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
              <div>
                <p className="text-black text-xs mb-1">
                  Theatre
                </p>

                <p className="text-black font-medium">
                  {booking.theatre?.name}
                </p>

                <p className="text-black text-xs">
                  {booking.theatre?.city}
                </p>
              </div>

              <div>
                <p className="text-black text-xs mb-1">
                  Screen
                </p>

                <p className="text-black font-medium">
                  {booking.theatre?.screen}
                </p>
              </div>

              <div>
                <p className="text-black text-xs mb-1">
                  Date
                </p>

                <p className="text-black font-medium">
                  {booking.date}
                </p>
              </div>

              <div>
                <p className="text-black text-xs mb-1">
                  Show Time
                </p>

                <p className="text-black font-medium">
                  {booking.showTime}
                </p>
              </div>
            </div>

            {/* Seats */}
            <div className="mb-6">
              <p className="text-black text-xs mb-2">
                Seats
              </p>

              <div className="flex flex-wrap gap-2">
                {booking.seats?.map((seat) => (
                  <span
                    key={seat}
                    className="bg-purple-600 text-white px-3 py-1 rounded-lg text-sm font-semibold"
                  >
                    {seat}
                  </span>
                ))}
              </div>
            </div>

            {/* Snacks (if any) */}
            {booking.snacks && booking.snacks.length > 0 && (
              <div className="mb-6">
                <p className="text-black text-xs mb-2">
                  Snacks
                </p>

                <div className="space-y-1">
                  {booking.snacks.map((item) => (
                    <p
                      key={item.id}
                      className="text-black text-sm"
                    >
                      {item.image} {item.name} × {item.quantity}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* Price Breakdown */}
            <div className="bg-gray-100 rounded-2xl p-4 mb-6 text-sm">
              <div className="flex justify-between mb-1">
                <span className="text-black">
                  Tickets
                </span>

                <span className="text-black">
                  ₹{booking.ticketAmount}
                </span>
              </div>

              <div className="flex justify-between mb-1">
                <span className="text-black">
                  Snacks
                </span>

                <span className="text-black">
                  ₹{booking.snacksAmount || 0}
                </span>
              </div>

              <div className="flex justify-between mb-1">
                <span className="text-black">
                  GST
                </span>

                <span className="text-black">
                  ₹{booking.gstAmount?.toFixed(2)}
                </span>
              </div>

              <div className="border-t border-gray-200 mt-2 pt-2 flex justify-between">
                <span className="text-black font-semibold">
                  Total Paid
                </span>

                <span className="text-black font-bold text-lg">
                  ₹{booking.finalTotal?.toFixed(2)}
                </span>
              </div>
            </div>

            {/* QR Code Placeholder */}
            <div className="flex flex-col items-center mb-4">
              <div className="w-32 h-32 bg-white rounded-xl flex items-center justify-center mb-2">
                <div className="text-center">
                  <div className="grid grid-cols-5 gap-0.5 p-2">
                    {Array.from({ length: 25 }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 ${
                          Math.random() > 0.4
                            ? 'bg-black'
                            : 'bg-white'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-xs text-black">
                Scan at the theatre entrance
              </p>
            </div>

            {/* Customer Info */}
            <div className="text-center text-xs text-black border-t border-gray-200 pt-4">
              <p>
                {booking.customer?.name} • {booking.customer?.phone}
              </p>

              <p className="mt-1">
                {booking.customer?.email}
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
          <Link
            to="/bookings"
            className="bg-black hover:bg-gray-800 text-white font-semibold px-8 py-3 rounded-xl text-center transition"
          >
            View My Bookings
          </Link>

          <Link
            to="/movies"
            className="bg-gray-100 hover:bg-gray-200 text-black font-semibold px-8 py-3 rounded-xl text-center transition"
          >
            Book Another Movie
          </Link>
        </div>

      </div>
    </div>
  );
}

export default Ticket;