// src/components/Navbar.js
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('cineseat_user') || 'null');

  const handleLogout = () => {
    localStorage.removeItem('cineseat_user');
    navigate('/login');
  };

  return (
    <nav className="bg-black text-white sticky top-0 z-50 shadow-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-center h-16">

          {/* Left - Logo */}
          <div className="absolute left-0">
            <Link to="/">
              <img
                src="/logo.png"
                alt="BookMySeat"
                className="h-10 w-auto object-contain"
              />
            </Link>
          </div>

          {/* Center - Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="hover:text-gray-300 transition-colors duration-200 font-medium">
              Home
            </Link>
            <Link to="/movies" className="hover:text-gray-300 transition-colors duration-200 font-medium">
              Movies
            </Link>
            <Link to="/bookings" className="hover:text-gray-300 transition-colors duration-200 font-medium">
              My Bookings
            </Link>
          </div>

          {/* Right - Logout / Login */}
          <div className="absolute right-0">
            {user ? (
              <button
                onClick={handleLogout}
                className="bg-white text-black hover:bg-red-600 hover:text-white px-5 py-2 rounded-full font-medium transition-all duration-200"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="bg-white text-black hover:bg-gray-200 px-5 py-2 rounded-full font-medium transition-all duration-200"
              >
                Login
              </Link>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;