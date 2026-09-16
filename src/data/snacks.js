// src/data/snacks.js

export const snackCategories = [
  'Popcorn',
  'Drinks',
  'Nachos & Snacks',
  'Quick Bites',
  'Desserts',
  'Combos',
];

export const snacks = [

  // ========== POPCORN ==========

  {
    id: 1,
    name: 'Classic Popcorn',
    category: 'Popcorn',
    basePrice: 120,
    image: '/snacks/classic-popcorn.png.png',
    options: {
      size: [
        { name: 'Small', extra: 0 },
        { name: 'Medium', extra: 0 },
        { name: 'Large', extra: 40 },
      ],
      flavour: [
        { name: 'Classic', extra: 0 },
        { name: 'Cheese', extra: 30 },
        { name: 'Caramel', extra: 30 },
      ],
      extra: [
        { name: 'Extra Cheese', extra: 30 },
        { name: 'Extra Butter', extra: 20 },
      ],
    },
  },

  {
    id: 2,
    name: 'Cheese Popcorn',
    category: 'Popcorn',
    basePrice: 150,
    image: '/snacks/cheese-popcorn.png.png',
    options: {
      size: [
        { name: 'Medium', extra: 0 },
        { name: 'Large', extra: 40 },
      ],
      flavour: [
        { name: 'Cheese', extra: 0 },
        { name: 'Spicy Cheese', extra: 20 },
      ],
      extra: [
        { name: 'Extra Cheese', extra: 30 },
      ],
    },
  },

  {
    id: 3,
    name: 'Caramel Popcorn',
    category: 'Popcorn',
    basePrice: 160,
    image: '/snacks/caramel-popcorn.png.png',
    options: {
      size: [
        { name: 'Medium', extra: 0 },
        { name: 'Large', extra: 40 },
      ],
      flavour: [
        { name: 'Caramel', extra: 0 },
        { name: 'Salted Caramel', extra: 20 },
      ],
      extra: [],
    },
  },

  // ========== DRINKS ==========

  {
    id: 4,
    name: 'Coke',
    category: 'Drinks',
    basePrice: 80,
    image: '/snacks/coke.png.png',
    options: {
      size: [
        { name: 'Regular', extra: 0 },
        { name: 'Large', extra: 30 },
      ],
      flavour: [
        { name: 'Original', extra: 0 },
        { name: 'Zero Sugar', extra: 0 },
      ],
      extra: [],
    },
  },

  {
    id: 5,
    name: 'Pepsi',
    category: 'Drinks',
    basePrice: 80,
    image: '/snacks/pepsi.png',
    options: {
      size: [
        { name: 'Regular', extra: 0 },
        { name: 'Large', extra: 30 },
      ],
      flavour: [],
      extra: [],
    },
  },

  {
    id: 6,
    name: 'Sprite',
    category: 'Drinks',
    basePrice: 80,
    image: '/snacks/sprite.png',
    options: {
      size: [
        { name: 'Regular', extra: 0 },
        { name: 'Large', extra: 30 },
      ],
      flavour: [],
      extra: [],
    },
  },

  {
    id: 7,
    name: 'Fanta',
    category: 'Drinks',
    basePrice: 80,
    image: '/snacks/fanta.png',
    options: {
      size: [
        { name: 'Regular', extra: 0 },
        { name: 'Large', extra: 30 },
      ],
      flavour: [],
      extra: [],
    },
  },

  {
    id: 8,
    name: 'Cold Coffee',
    category: 'Drinks',
    basePrice: 120,
    image: '/snacks/cold-coffee.png',
    options: {
      size: [
        { name: 'Regular', extra: 0 },
        { name: 'Large', extra: 30 },
      ],
      flavour: [
        { name: 'Classic', extra: 0 },
        { name: 'Chocolate', extra: 20 },
      ],
      extra: [],
    },
  },

  {
    id: 9,
    name: 'Mineral Water',
    category: 'Drinks',
    basePrice: 40,
    image: '/snacks/mineral water.png',
    options: {
      size: [
        { name: '500ml', extra: 0 },
        { name: '1 Litre', extra: 20 },
      ],
      flavour: [],
      extra: [],
    },
  },

  // ========== NACHOS & SNACKS ==========

  {
    id: 10,
    name: 'Nachos with Cheese',
    category: 'Nachos & Snacks',
    basePrice: 180,
    image: '/snacks/Nachos with cheese.png',
    options: {
      size: [
        { name: 'Regular', extra: 0 },
        { name: 'Large', extra: 50 },
      ],
      flavour: [
        { name: 'Cheese', extra: 0 },
        { name: 'Salsa', extra: 20 },
        { name: 'Jalapeno', extra: 25 },
      ],
      extra: [
        { name: 'Extra Cheese', extra: 30 },
        { name: 'Guacamole', extra: 40 },
      ],
    },
  },

  {
    id: 11,
    name: 'Loaded Nachos',
    category: 'Nachos & Snacks',
    basePrice: 220,
    image: '/snacks/Loaded Nachos.png',
    options: {
      size: [
        { name: 'Regular', extra: 0 },
        { name: 'Large', extra: 50 },
      ],
      flavour: [],
      extra: [
        { name: 'Extra Cheese', extra: 30 },
        { name: 'Sour Cream', extra: 25 },
      ],
    },
  },

  {
    id: 12,
    name: 'French Fries',
    category: 'Nachos & Snacks',
    basePrice: 120,
    image: '/snacks/French Fries.png',
    options: {
      size: [
        { name: 'Regular', extra: 0 },
        { name: 'Large', extra: 40 },
      ],
      flavour: [
        { name: 'Salted', extra: 0 },
        { name: 'Peri Peri', extra: 20 },
        { name: 'Cheese', extra: 30 },
      ],
      extra: [],
    },
  },

  // ========== QUICK BITES ==========

  {
    id: 13,
    name: 'Veg Burger',
    category: 'Quick Bites',
    basePrice: 150,
    image: '/snacks/Veg Burger.png',
    options: {
      size: [],
      flavour: [],
      extra: [
        { name: 'Cheese Slice', extra: 30 },
        { name: 'Extra Patty', extra: 50 },
      ],
    },
  },

  {
    id: 14,
    name: 'Chicken Burger',
    category: 'Quick Bites',
    basePrice: 180,
    image: '/snacks/Chicken Burger.png',
    options: {
      size: [],
      flavour: [],
      extra: [
        { name: 'Cheese Slice', extra: 30 },
        { name: 'Extra Patty', extra: 60 },
      ],
    },
  },

  {
    id: 15,
    name: 'Veg Sandwich',
    category: 'Quick Bites',
    basePrice: 130,
    image: '/snacks/Veg Sandwich.png',
    options: {
      size: [],
      flavour: [
        { name: 'Classic', extra: 0 },
        { name: 'Grilled', extra: 20 },
      ],
      extra: [
        { name: 'Cheese', extra: 30 },
      ],
    },
  },

  {
    id: 16,
    name: 'Pizza Slice',
    category: 'Quick Bites',
    basePrice: 140,
    image: '/snacks/Pizza Slice.png',
    options: {
      size: [],
      flavour: [
        { name: 'Margherita', extra: 0 },
        { name: 'Farmhouse', extra: 30 },
        { name: 'Chicken', extra: 40 },
      ],
      extra: [],
    },
  },

  {
    id: 17,
    name: 'Samosa (2 pcs)',
    category: 'Quick Bites',
    basePrice: 60,
    image: '/snacks/Samosa.png',
    options: {
      size: [],
      flavour: [],
      extra: [
        { name: 'Chutney', extra: 10 },
      ],
    },
  },

  // ========== DESSERTS ==========

  {
    id: 18,
    name: 'Ice Cream Cup',
    category: 'Desserts',
    basePrice: 100,
    image: '/snacks/Ice Cream.png',
    options: {
      size: [
        { name: 'Single', extra: 0 },
        { name: 'Double', extra: 50 },
      ],
      flavour: [
        { name: 'Vanilla', extra: 0 },
        { name: 'Chocolate', extra: 0 },
        { name: 'Butterscotch', extra: 10 },
      ],
      extra: [],
    },
  },

  {
    id: 19,
    name: 'Brownie',
    category: 'Desserts',
    basePrice: 120,
    image: '/snacks/Brownie.png',
    options: {
      size: [],
      flavour: [],
      extra: [
        { name: 'With Ice Cream', extra: 40 },
        { name: 'Chocolate Sauce', extra: 20 },
      ],
    },
  },

  {
    id: 20,
    name: 'Waffle',
    category: 'Desserts',
    basePrice: 150,
    image: '/snacks/Waffle.png',
    options: {
      size: [],
      flavour: [
        { name: 'Classic', extra: 0 },
        { name: 'Chocolate', extra: 20 },
        { name: 'Nutella', extra: 40 },
      ],
      extra: [],
    },
  },

  // ========== COMBOS ==========

  {
    id: 21,
    name: 'Popcorn + Coke Combo',
    category: 'Combos',
    basePrice: 220,
    image: '/snacks/Popcorn+coke combo.png',
    options: {
      size: [
        { name: 'Medium', extra: 0 },
        { name: 'Large', extra: 50 },
      ],
      flavour: [
        { name: 'Classic Popcorn', extra: 0 },
        { name: 'Cheese Popcorn', extra: 30 },
      ],
      extra: [],
    },
  },

  {
    id: 22,
    name: 'Nachos + Drink Combo',
    category: 'Combos',
    basePrice: 280,
    image: '/snacks/Nachos+drink combo.png',
    options: {
      size: [
        { name: 'Regular', extra: 0 },
        { name: 'Large', extra: 60 },
      ],
      flavour: [],
      extra: [
        { name: 'Extra Cheese', extra: 30 },
      ],
    },
  },

  {
    id: 23,
    name: 'Burger + Fries + Drink',
    category: 'Combos',
    basePrice: 320,
    image: '/snacks/Burger +frenchfries+drink.png',
    options: {
      size: [],
      flavour: [
        { name: 'Veg Burger', extra: 0 },
        { name: 'Chicken Burger', extra: 40 },
      ],
      extra: [],
    },
  },

  {
    id: 24,
    name: 'Family Combo (2 Popcorn + 2 Drinks)',
    category: 'Combos',
    basePrice: 450,
    image: '/snacks/Family combo.png',
    options: {
      size: [
        { name: 'Medium', extra: 0 },
        { name: 'Large', extra: 80 },
      ],
      flavour: [],
      extra: [],
    },
  },

];