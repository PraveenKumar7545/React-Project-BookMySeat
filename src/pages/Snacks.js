// src/pages/Snacks.js

import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { snacks, snackCategories } from '../data/snacks';

function Snacks() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cartSnacks, setCartSnacks] = useState([]);
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('cineseat_booking');
    if (saved) setBooking(JSON.parse(saved));
  }, []);

  // Filter snacks
  const filteredSnacks =
    selectedCategory === 'All'
      ? snacks
      : snacks.filter((s) => s.category === selectedCategory);

  // Calculate price of one snack item with its selected options
  const calculateItemPrice = (snack, selectedOptions, quantity) => {
    let price = snack.basePrice;

    if (selectedOptions.size) {
      const sizeOpt = snack.options.size.find(
        (o) => o.name === selectedOptions.size
      );

      if (sizeOpt) price += sizeOpt.extra;
    }

    if (selectedOptions.flavour) {
      const flavOpt = snack.options.flavour.find(
        (o) => o.name === selectedOptions.flavour
      );

      if (flavOpt) price += flavOpt.extra;
    }

    if (selectedOptions.extras && selectedOptions.extras.length > 0) {
      selectedOptions.extras.forEach((extraName) => {
        const extraOpt = snack.options.extra.find(
          (o) => o.name === extraName
        );

        if (extraOpt) price += extraOpt.extra;
      });
    }

    return price * quantity;
  };

  // Add snack to cart
  const addToCart = (snack) => {
    const defaultOptions = {
      size: snack.options.size[0]?.name || null,
      flavour: snack.options.flavour[0]?.name || null,
      extras: [],
    };

    const newItem = {
      id: Date.now(),
      snackId: snack.id,
      name: snack.name,
      image: snack.image,
      basePrice: snack.basePrice,
      options: snack.options,
      selectedOptions: defaultOptions,
      quantity: 1,
      totalPrice: calculateItemPrice(snack, defaultOptions, 1),
    };

    setCartSnacks([...cartSnacks, newItem]);
  };

  // Update quantity
  const updateQuantity = (itemId, change) => {
    setCartSnacks((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          const newQty = Math.max(1, item.quantity + change);

          return {
            ...item,
            quantity: newQty,
            totalPrice: calculateItemPrice(
              {
                basePrice: item.basePrice,
                options: item.options,
              },
              item.selectedOptions,
              newQty
            ),
          };
        }

        return item;
      })
    );
  };

  // Change option (size / flavour)
  const changeOption = (itemId, type, value) => {
    setCartSnacks((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          const newSelected = {
            ...item.selectedOptions,
            [type]: value,
          };

          return {
            ...item,
            selectedOptions: newSelected,
            totalPrice: calculateItemPrice(
              {
                basePrice: item.basePrice,
                options: item.options,
              },
              newSelected,
              item.quantity
            ),
          };
        }

        return item;
      })
    );
  };

  // Toggle extra
  const toggleExtra = (itemId, extraName) => {
    setCartSnacks((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          const currentExtras = item.selectedOptions.extras || [];

          let newExtras;

          if (currentExtras.includes(extraName)) {
            newExtras = currentExtras.filter(
              (e) => e !== extraName
            );
          } else {
            newExtras = [...currentExtras, extraName];
          }

          const newSelected = {
            ...item.selectedOptions,
            extras: newExtras,
          };

          return {
            ...item,
            selectedOptions: newSelected,
            totalPrice: calculateItemPrice(
              {
                basePrice: item.basePrice,
                options: item.options,
              },
              newSelected,
              item.quantity
            ),
          };
        }

        return item;
      })
    );
  };

  // Remove item
  const removeItem = (itemId) => {
    setCartSnacks((prev) =>
      prev.filter((item) => item.id !== itemId)
    );
  };

  const snacksTotal = cartSnacks.reduce(
    (sum, item) => sum + item.totalPrice,
    0
  );

  const handleContinue = () => {
    const updatedBooking = {
      ...booking,
      snacks: cartSnacks,
      snacksAmount: snacksTotal,
    };

    localStorage.setItem(
      'cineseat_booking',
      JSON.stringify(updatedBooking)
    );

    navigate('/cart');
  };

  if (!booking) {
    return (
      <div className="flex-grow flex items-center justify-center p-6 text-center">
        <div>
          <p className="text-xl text-black mb-4">
            No booking found
          </p>

          <Link
            to="/movies"
            className="text-black hover:underline"
          >
            ← Go to Movies
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-grow py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <Link
            to={`/seats/${id}`}
            className="text-black hover:text-gray-700 text-sm mb-4 inline-block"
          >
            ← Back to Seats
          </Link>

          <h1 className="text-3xl md:text-4xl font-bold text-black mb-2">
            Build Your Combo
          </h1>

          <p className="text-black">
            Customize your snacks • Prices update live
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left - Snack List */}
          <div className="lg:col-span-2">

            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-6">
              <button
                onClick={() => setSelectedCategory('All')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  selectedCategory === 'All'
                    ? 'bg-black text-white'
                    : 'bg-black text-white hover:bg-gray-800'
                }`}
              >
                All
              </button>

              {snackCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                    selectedCategory === cat
                      ? 'bg-black text-white'
                      : 'bg-black text-white hover:bg-gray-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Snacks Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredSnacks.map((snack) => (
                <div
                  key={snack.id}
                  className="bg-white/5 border border-white/10 rounded-2xl p-5 flex gap-4 hover:border-purple-500/40 transition"
                >

                  {/* Snack Image */}
                  <div className="w-24 h-24 flex-shrink-0">
                    <img
                      src={snack.image}
                      alt={snack.name}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-black font-semibold">
                      {snack.name}
                    </h3>

                    <p className="text-black text-sm mb-3">
                      ₹{snack.basePrice}
                    </p>

                    <button
                      onClick={() => addToCart(snack)}
                      className="bg-black hover:bg-gray-800 text-white text-sm px-4 py-1.5 rounded-lg transition"
                    >
                      Add
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Your Combo (Cart) */}
          <div className="lg:col-span-1">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sticky top-24">

              <h2 className="text-xl font-bold text-black mb-4">
                Your Combo
              </h2>

              {cartSnacks.length === 0 ? (
                <p className="text-black text-sm">
                  No snacks added yet
                </p>
              ) : (
                <div className="space-y-5 max-h-[60vh] overflow-y-auto pr-2">

                  {cartSnacks.map((item) => (
                    <div
                      key={item.id}
                      className="border-b border-white/10 pb-4"
                    >

                      <div className="flex justify-between items-start mb-2">

                        <div className="flex gap-2">

                          {/* Cart Snack Image */}
                          <div className="w-12 h-12 flex-shrink-0">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-contain"
                            />
                          </div>

                          <div>
                            <p className="text-black font-medium text-sm">
                              {item.name}
                            </p>

                            <p className="text-black text-xs">
                              ₹{item.totalPrice}
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-400 text-xs hover:text-red-300"
                        >
                          Remove
                        </button>
                      </div>

                      {/* Size */}
                      {item.options.size.length > 0 && (
                        <div className="mb-2">
                          <p className="text-xs text-black mb-1">
                            Size
                          </p>

                          <div className="flex flex-wrap gap-1">
                            {item.options.size.map((opt) => (
                              <button
                                key={opt.name}
                                onClick={() =>
                                  changeOption(
                                    item.id,
                                    'size',
                                    opt.name
                                  )
                                }
                                className={`text-xs px-2 py-1 rounded ${
                                  item.selectedOptions.size === opt.name
                                    ? 'bg-black text-white'
                                    : 'bg-black text-white hover:bg-gray-800'
                                }`}
                              >
                                {opt.name}{' '}
                                {opt.extra > 0 &&
                                  `+₹${opt.extra}`}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Flavour */}
                      {item.options.flavour.length > 0 && (
                        <div className="mb-2">
                          <p className="text-xs text-black mb-1">
                            Flavour
                          </p>

                          <div className="flex flex-wrap gap-1">
                            {item.options.flavour.map((opt) => (
                              <button
                                key={opt.name}
                                onClick={() =>
                                  changeOption(
                                    item.id,
                                    'flavour',
                                    opt.name
                                  )
                                }
                                className={`text-xs px-2 py-1 rounded ${
                                  item.selectedOptions.flavour === opt.name
                                    ? 'bg-black text-white'
                                    : 'bg-black text-white hover:bg-gray-800'
                                }`}
                              >
                                {opt.name}{' '}
                                {opt.extra > 0 &&
                                  `+₹${opt.extra}`}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Extras */}
                      {item.options.extra.length > 0 && (
                        <div className="mb-2">
                          <p className="text-xs text-black mb-1">
                            Extra
                          </p>

                          <div className="flex flex-wrap gap-1">
                            {item.options.extra.map((opt) => (
                              <button
                                key={opt.name}
                                onClick={() =>
                                  toggleExtra(
                                    item.id,
                                    opt.name
                                  )
                                }
                                className={`text-xs px-2 py-1 rounded ${
                                  item.selectedOptions.extras?.includes(
                                    opt.name
                                  )
                                    ? 'bg-black text-white'
                                    : 'bg-black text-white hover:bg-gray-800'
                                }`}
                              >
                                {opt.name} +₹{opt.extra}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Quantity */}
                      <div className="flex items-center gap-3 mt-2">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, -1)
                          }
                          className="w-7 h-7 rounded bg-black text-white flex items-center justify-center hover:bg-gray-800"
                        >
                          −
                        </button>

                        <span className="text-black font-medium">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            updateQuantity(item.id, 1)
                          }
                          className="w-7 h-7 rounded bg-black text-white flex items-center justify-center hover:bg-gray-800"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Total + Continue */}
              <div className="mt-6 pt-4 border-t border-white/10">

                <div className="flex justify-between text-black mb-4">
                  <span>Snacks Total</span>

                  <span className="font-bold text-xl">
                    ₹{snacksTotal}
                  </span>
                </div>

                <button
                  onClick={handleContinue}
                  className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-3 rounded-xl transition"
                >
                  Continue to Cart
                </button>

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Snacks;