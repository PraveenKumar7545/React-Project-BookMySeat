
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';

import Home from './pages/Home';
import Login from './pages/Login';
import Movies from './pages/Movies';
import MovieDetails from './pages/MovieDetails';
import TheatreShows from './pages/TheatreShows';
import SeatSelection from './pages/SeatSelection';
import Snacks from './pages/Snacks';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Ticket from './pages/Ticket';
import MyBookings from './pages/MyBookings';

// Check if user is logged in
const isLoggedIn = () => {
  return localStorage.getItem('cineseat_user') !== null;
};

// Protected Route
function ProtectedRoute({ children }) {
  if (!isLoggedIn()) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function App() {
  return (
    <HashRouter>
      <Routes>

        {/* Login Page */}
        <Route path="/login" element={<Login />} />

        {/* Protected Pages */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <div className="min-h-screen flex flex-col bg-gray-100 text-black">

                <Navbar />

                <div className="flex-grow">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/movies" element={<Movies />} />
                    <Route path="/movie/:id" element={<MovieDetails />} />
                    <Route path="/theatre/:id" element={<TheatreShows />} />
                    <Route path="/seats/:id" element={<SeatSelection />} />
                    <Route path="/snacks/:id" element={<Snacks />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/ticket" element={<Ticket />} />
                    <Route path="/bookings" element={<MyBookings />} />

                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </div>

                <Footer />
                <Chatbot />

              </div>
            </ProtectedRoute>
          }
        />

      </Routes>
    </HashRouter>
  );
}

export default App;
