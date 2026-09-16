// src/pages/MyBookings.js
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function MyBookings() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('cineseat_bookings');
    if (saved) {
      setBookings(JSON.parse(saved));
    }
  }, []);

  const viewTicket = (booking) => {
    // Set this booking as the current one so Ticket page can show it
    localStorage.setItem('cineseat_booking', JSON.stringify(booking));
    navigate('/ticket');
  };

  return (
    <div className="flex-grow py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-black mb-2">
            My Bookings
          </h1>

          <p className="text-gray-600">
            All your past and upcoming cinema experiences
          </p>
        </div>

        {/* Empty State */}
        {bookings.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-2xl border border-gray-200">

            <div className="text-5xl mb-4">🎬</div>

            <p className="text-xl text-black mb-2">
              No bookings yet
            </p>

            <p className="text-gray-500 text-sm mb-6">
              Book your first movie and it will appear here
            </p>

            <Link
              to="/movies"
              className="inline-block bg-black hover:bg-gray-800 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-200"
            >
              Browse Movies
            </Link>

          </div>
        ) : (
          <div className="space-y-5">

            {bookings.map((booking) => (
              <div
                key={booking.bookingId}
                className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-gray-400 hover:shadow-md transition-all duration-200"
              >

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

                  {/* Left Info */}
                  <div className="flex-1">

                    <div className="flex items-center gap-3 mb-2">

                      <h3 className="text-xl font-bold text-black">
                        {booking.movie?.title}
                      </h3>

                      {booking.isSpecialShow && (
                        <span className="bg-gray-200 text-black text-xs px-2 py-0.5 rounded-full">
                          FDFS
                        </span>
                      )}

                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1 text-sm text-gray-600">

                      <p>
                        <span className="text-gray-800 font-medium">
                          Theatre:
                        </span>{' '}
                        {booking.theatre?.name}
                      </p>

                      <p>
                        <span className="text-gray-800 font-medium">
                          Screen:
                        </span>{' '}
                        {booking.theatre?.screen}
                      </p>

                      <p>
                        <span className="text-gray-800 font-medium">
                          Date:
                        </span>{' '}
                        {booking.date}
                      </p>

                      <p>
                        <span className="text-gray-800 font-medium">
                          Time:
                        </span>{' '}
                        {booking.showTime}
                      </p>

                      <p>
                        <span className="text-gray-800 font-medium">
                          Seats:
                        </span>{' '}
                        {booking.seats?.join(', ')}
                      </p>

                      <p>
                        <span className="text-gray-800 font-medium">
                          Booking ID:
                        </span>{' '}
                        <span className="font-mono">
                          {booking.bookingId}
                        </span>
                      </p>

                    </div>

                    {/* Snacks summary */}
                    {booking.snacks && booking.snacks.length > 0 && (
                      <p className="text-sm text-gray-500 mt-3">
                        Snacks:{' '}
                        {booking.snacks
                          .map((s) => `${s.name} ×${s.quantity}`)
                          .join(', ')}
                      </p>
                    )}

                  </div>

                  {/* Right - Price + Button */}
                  <div className="flex flex-col items-start md:items-end gap-3">

                    <div className="text-right">

                      <p className="text-sm text-gray-500">
                        Total Paid
                      </p>

                      <p className="text-2xl font-bold text-black">
                        ₹{booking.finalTotal?.toFixed(2)}
                      </p>

                    </div>

                    <button
                      onClick={() => viewTicket(booking)}
                      className="bg-black hover:bg-gray-800 text-white font-medium px-6 py-2.5 rounded-xl transition-all duration-200 text-sm"
                    >
                      View Ticket
                    </button>

                  </div>

                </div>
              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
}

export default MyBookings;