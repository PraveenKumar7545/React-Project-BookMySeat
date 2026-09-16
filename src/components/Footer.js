// src/components/Footer.js

function Footer() {
  return (
    <footer className="bg-black text-gray-400 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img
                src="/logo.png"
                alt="BookMySeat"
                className="h-18 w-60 object-contain"
              />
            </div>

            <p className="text-sm leading-relaxed text-gray-400">
              Book Your Movie. Build Your Combo. Enjoy the Show.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              Quick Links
            </h3>

            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Home
                </a>
              </li>

              <li>
                <a
                  href="/movies"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Movies
                </a>
              </li>

              <li>
                <a
                  href="/bookings"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  My Bookings
                </a>
              </li>

              <li>
                <a
                  href="/login"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Login
                </a>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              About
            </h3>

            <p className="text-sm leading-relaxed text-gray-400">
              BookMySeat is a simple and modern cinema booking platform.
              Choose your movie, select seats, customize snacks, and enjoy
              a complete cinema experience.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} BookMySeat. Built for learning purposes.
        </div>

      </div>
    </footer>
  );
}

export default Footer;