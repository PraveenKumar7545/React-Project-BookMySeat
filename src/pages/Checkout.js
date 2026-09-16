// src/pages/Checkout.js 
import { useState, useEffect } from 'react'; 
import { useNavigate, Link } from 'react-router-dom'; 
 
function Checkout() { 
  const navigate = useNavigate(); 
  const [booking, setBooking] = useState(null); 
 
  // Form fields 
  const [name, setName] = useState(''); 
  const [email, setEmail] = useState(''); 
  const [phone, setPhone] = useState(''); 
  const [paymentMethod, setPaymentMethod] = useState('upi'); 
  const [error, setError] = useState(''); 
 
  useEffect(() => { 
    const saved = localStorage.getItem('cineseat_booking'); 
    if (saved) { 
      const data = JSON.parse(saved); 
      setBooking(data); 
 
      // Pre-fill email if user is logged in 
      const user = JSON.parse(localStorage.getItem('cineseat_user') || 'null'); 
      if (user) { 
        setEmail(user.email || ''); 
        setName(user.name || ''); 
      } 
    } 
  }, []); 
 
  const handleConfirmBooking = (e) => { 
    e.preventDefault(); 
 
    // Simple validation 
    if (!name.trim() || !email.trim() || !phone.trim()) { 
      setError('Please fill all fields'); 
      return; 
    } 
 
    if (phone.length < 10) { 
      setError('Please enter a valid 10-digit phone number'); 
      return; 
    } 
 
    // Create booking ID 
    const bookingId = 'CS' + Date.now().toString().slice(-8); 
 
    // Final booking object 
    const finalBooking = { 
      ...booking, 
      customer: { 
        name: name.trim(), 
        email: email.trim(), 
        phone: phone.trim(), 
      }, 
      paymentMethod, 
      bookingId, 
      bookedAt: new Date().toISOString(), 
    }; 
 
    // Save to current booking 
    localStorage.setItem('cineseat_booking', JSON.stringify(finalBooking)); 
 
    // Also save to My Bookings list 
    const allBookings = JSON.parse(localStorage.getItem('cineseat_bookings') || '[]'); 
    allBookings.unshift(finalBooking); // add to beginning 
    localStorage.setItem('cineseat_bookings', JSON.stringify(allBookings)); 
 
    // Go to Digital Ticket 
    navigate('/ticket'); 
  }; 
 
  if (!booking) { 
    return ( 
      <div className="flex-grow flex items-center justify-center p-6 text-center"> 
        <div> 
          <p className="text-xl text-black mb-4">No booking found</p> 
          <Link to="/movies" className="text-black hover:underline"> 
            ← Browse Movies 
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
          <h1 className="text-3xl md:text-4xl font-bold text-black mb-2"> 
            Checkout 
          </h1> 
          <p className="text-black"> 
            Enter your details and confirm your booking 
          </p> 
        </div> 
 
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8"> 
 
          {/* Left - Form */} 
          <div className="lg:col-span-3"> 
            <form onSubmit={handleConfirmBooking} className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-5"> 
 
              <h2 className="text-xl font-semibold text-black mb-2">Customer Details</h2> 
 
              {/* Name */} 
              <div> 
                <label className="block text-sm text-black mb-1">Full Name</label> 
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  placeholder="Enter your full name" 
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500" 
                /> 
              </div> 
 
              {/* Email */} 
              <div> 
                <label className="block text-sm text-black mb-1">Email</label> 
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder="you@example.com" 
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500" 
                /> 
              </div> 
 
              {/* Phone */} 
              <div> 
                <label className="block text-sm text-black mb-1">Phone Number</label> 
                <input 
                  type="tel" 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)} 
                  placeholder="10-digit mobile number" 
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500" 
                /> 
              </div> 
 
              {/* Payment Method */} 
              <div> 
                <label className="block text-sm text-black mb-3">Payment Method (Demo)</label> 
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3"> 
                  {[ 
                    { id: 'upi', label: 'UPI', icon: '📱' }, 
                    { id: 'card', label: 'Card', icon: '💳' }, 
                    { id: 'netbanking', label: 'Net Banking', icon: '🏦' }, 
                  ].map((method) => ( 
                    <button 
                      key={method.id} 
                      type="button" 
                      onClick={() => setPaymentMethod(method.id)} 
                      className={`flex items-center justify-center gap-2 py-3 rounded-xl border transition ${ 
                        paymentMethod === method.id 
                          ? 'bg-black border-black text-white' 
                          : 'bg-white/5 border-white/10 text-black hover:bg-gray-100' 
                      }`} 
                    > 
                      <span>{method.icon}</span> 
                      <span className="text-sm font-medium">{method.label}</span> 
                    </button> 
                  ))} 
                </div> 
                <p className="text-xs text-black mt-2"> 
                  * This is a demo. No real payment will be processed. 
                </p> 
              </div> 
 
              {/* Error */} 
              {error && ( 
                <p className="text-red-400 text-sm">{error}</p> 
              )} 
 
              {/* Confirm Button */} 
              <button 
                type="submit" 
                className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-4 rounded-xl transition-all shadow-lg text-lg" 
              > 
                Confirm Booking 
              </button> 
            </form> 
          </div> 
 
          {/* Right - Booking Summary */} 
          <div className="lg:col-span-2"> 
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sticky top-24"> 
              <h2 className="text-xl font-semibold text-black mb-5">Booking Summary</h2> 
 
              <div className="space-y-3 text-sm mb-6"> 
                <div className="flex justify-between"> 
                  <span className="text-black">Movie</span> 
                  <span className="text-black text-right max-w-[180px]">{booking.movie?.title}</span> 
                </div> 
                <div className="flex justify-between"> 
                  <span className="text-black">Theatre</span> 
                  <span className="text-black text-right">{booking.theatre?.name}</span> 
                </div> 
                <div className="flex justify-between"> 
                  <span className="text-black">Date & Time</span> 
                  <span className="text-black text-right"> 
                    {booking.date} • {booking.showTime} 
                  </span> 
                </div> 
                <div className="flex justify-between"> 
                  <span className="text-black">Seats</span> 
                  <span className="text-black text-right"> 
                    {booking.seats?.join(', ')} 
                  </span> 
                </div> 
              </div> 
 
              <div className="border-t border-white/10 pt-4 space-y-2 text-sm"> 
                <div className="flex justify-between"> 
                  <span className="text-black">Tickets</span> 
                  <span className="text-black">₹{booking.ticketAmount || 0}</span> 
                </div> 
                <div className="flex justify-between"> 
                  <span className="text-black">Snacks</span> 
                  <span className="text-black">₹{booking.snacksAmount || 0}</span> 
                </div> 
                <div className="flex justify-between"> 
                  <span className="text-black">Subtotal</span> 
                  <span className="text-black">₹{booking.subtotal?.toFixed(2)}</span> 
                </div> 
                <div className="flex justify-between"> 
                  <span className="text-black"> 
                    GST ({(booking.gstRate * 100).toFixed(0)}%) 
                  </span> 
                  <span className="text-black">₹{booking.gstAmount?.toFixed(2)}</span> 
                </div> 
              </div> 
 
              <div className="border-t border-white/10 mt-4 pt-4"> 
                <div className="flex justify-between items-center"> 
                  <span className="text-black font-semibold">Total Amount</span> 
                  <span className="text-2xl font-bold text-black"> 
                    ₹{booking.finalTotal?.toFixed(2)} 
                  </span> 
                </div> 
              </div> 
            </div> 
          </div> 
        </div> 
      </div> 
    </div> 
  ); 
} 
 
export default Checkout;