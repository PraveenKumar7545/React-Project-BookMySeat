// src/pages/Cart.js
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Cart() {
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);

  // GST rate (you can change this value easily)
  const GST_RATE = 0.05; // 5%

  useEffect(() => {
    const saved = localStorage.getItem('cineseat_booking');
    if (saved) {
      setBooking(JSON.parse(saved));
    }
  }, []);

  if (!booking) {
    return (
      <div className="flex-grow flex items-center justify-center p-6 text-center">
        <div>
          <p className="text-xl text-black mb-4">Your cart is empty</p>
          <Link to="/movies" className="text-black hover:underline">
            ← Browse Movies
          </Link>
        </div>
      </div>
    );
  }

  const ticketAmount = booking.ticketAmount || 0;
  const snacksAmount = booking.snacksAmount || 0;
  const subtotal = ticketAmount + snacksAmount;
  const gstAmount = subtotal * GST_RATE;
  const finalTotal = subtotal + gstAmount;

  // Save the calculated totals so Checkout can use them
  const handleProceedToCheckout = () => {
    const updatedBooking = {
      ...booking,
      subtotal,
      gstRate: GST_RATE,
      gstAmount: Number(gstAmount.toFixed(2)),
      finalTotal: Number(finalTotal.toFixed(2)),
    };
    localStorage.setItem('cineseat_booking', JSON.stringify(updatedBooking));
    navigate('/checkout');
  };

  return (
    <div className="flex-grow py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-black mb-2">
            Your Cart
          </h1>
          <p className="text-black">
            Review your cinema experience before checkout
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left - Details */}
          <div className="lg:col-span-2 space-y-6">

            {/* Movie & Show Info */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-black mb-4">Movie & Show</h2>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-black">Movie</span>
                  <span className="text-black font-medium">{booking.movie?.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-black">Theatre</span>
                  <span className="text-black">{booking.theatre?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-black">Screen</span>
                  <span className="text-black">{booking.theatre?.screen}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-black">Date</span>
                  <span className="text-black">{booking.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-black">Show Time</span>
                  <span className="text-black">{booking.showTime}</span>
                </div>
                {booking.isSpecialShow && (
                  <div className="flex justify-between">
                    <span className="text-black">Show Type</span>
                    <span className="text-yellow-300 font-medium">FDFS / Special</span>
                  </div>
                )}
              </div>
            </div>

            {/* Seats */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-black mb-4">Selected Seats</h2>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {booking.seats?.map((seat) => (
                  <span
                    key={seat}
                    className="bg-purple-600/30 text-black px-3 py-1 rounded-lg text-sm font-medium"
                  >
                    {seat}
                  </span>
                ))}
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-black">Ticket Amount</span>
                <span className="text-black font-medium">₹{ticketAmount}</span>
              </div>
            </div>

            {/* Snacks */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-black mb-4">Snacks</h2>

              {booking.snacks && booking.snacks.length > 0 ? (
                <div className="space-y-4">
                  {booking.snacks.map((item) => (
                    <div key={item.id} className="flex justify-between items-start text-sm">
                      <div>
                        <p className="text-black font-medium">
                          {item.image} {item.name} × {item.quantity}
                        </p>
                        <p className="text-black text-xs mt-1">
                          {item.selectedOptions.size && `${item.selectedOptions.size}`}
                          {item.selectedOptions.flavour && ` • ${item.selectedOptions.flavour}`}
                          {item.selectedOptions.extras?.length > 0 &&
                            ` • ${item.selectedOptions.extras.join(', ')}`}
                        </p>
                      </div>
                      <span className="text-black font-medium">₹{item.totalPrice}</span>
                    </div>
                  ))}

                  <div className="flex justify-between pt-3 border-t border-white/10 text-sm">
                    <span className="text-black">Snacks Amount</span>
                    <span className="text-black font-medium">₹{snacksAmount}</span>
                  </div>
                </div>
              ) : (
                <p className="text-black text-sm">No snacks added</p>
              )}
            </div>
          </div>

          {/* Right - Price Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-black mb-6">Price Summary</h2>

              <div className="space-y-3 text-sm mb-6">
                <div className="flex justify-between">
                  <span className="text-black">Tickets</span>
                  <span className="text-black">₹{ticketAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-black">Snacks</span>
                  <span className="text-black">₹{snacksAmount}</span>
                </div>

                <div className="border-t border-white/10 pt-3 flex justify-between">
                  <span className="text-black">Subtotal</span>
                  <span className="text-black font-medium">₹{subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-black">
                    GST ({(GST_RATE * 100).toFixed(0)}%)
                  </span>
                  <span className="text-black">₹{gstAmount.toFixed(2)}</span>
                </div>
              </div>

              <div className="border-t border-white/10 pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-black font-semibold text-lg">Total</span>
                  <span className="text-2xl font-bold text-black">
                    ₹{finalTotal.toFixed(2)}
                  </span>
                </div>
              </div>

            <button 
            onClick={handleProceedToCheckout} 
            className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-3.5 rounded-xl transition-all shadow-lg"
            > 
            Proceed to Checkout 
            </button>

              <Link
                to={`/snacks/${booking.movie?.id}`}
                className="block text-center text-black hover:text-gray-700 text-sm mt-4"
              >
                ← Edit Snacks
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;