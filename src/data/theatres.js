// src/data/theatres.js

export const malls = [
  {
    id: 1,
    name: "Phoenix Marketcity",
    city: "Chennai",
  },
  {
    id: 2,
    name: "Express Avenue",
    city: "Chennai",
  },
  {
    id: 3,
    name: "VR Chennai",
    city: "Chennai",
  },
  {
    id: 4,
    name: "Marina Mall",
    city: "Chennai",
  },
  {
    id: 5,
    name: "Ampa SkyOne",
    city: "Chennai",
  },
];

export const theatres = [
  // Phoenix Marketcity
  {
    id: 1,
    mallId: 1,
    name: "PVR Cinemas",
    city: "Chennai",
    screen: "Screen 3 - Gold Class",
  },
  {
    id: 2,
    mallId: 1,
    name: "PVR IMAX",
    city: "Chennai",
    screen: "Screen 1 - IMAX",
  },

  // Express Avenue
  {
    id: 3,
    mallId: 2,
    name: "INOX",
    city: "Chennai",
    screen: "Screen 2 - Atmos",
  },
  {
    id: 4,
    mallId: 2,
    name: "INOX Laserplex",
    city: "Chennai",
    screen: "Screen 5",
  },

  // VR Chennai
  {
    id: 5,
    mallId: 3,
    name: "SPI Cinemas",
    city: "Chennai",
    screen: "Screen 1 - Prestige",
  },
  {
    id: 6,
    mallId: 3,
    name: "SPI Palazzo",
    city: "Chennai",
    screen: "Screen 4",
  },

  // Marina Mall
  {
    id: 7,
    mallId: 4,
    name: "AGS Cinemas",
    city: "Chennai",
    screen: "Screen 2",
  },

  // Ampa SkyOne
  {
    id: 8,
    mallId: 5,
    name: "Escape Cinemas",
    city: "Chennai",
    screen: "Screen 3 - Luxe",
  },
];

// Normal show times
export const normalShowTimes = [
  "10:00 AM",
  "1:30 PM",
  "4:30 PM",
  "7:30 PM",
  "10:30 PM",
];

// Special / FDFS show times
export const specialShowTimes = [
  "9:00 AM",
  "12:30 PM",
  "6:00 PM",
  "9:30 PM",
];

// Ticket prices
export const ticketPrices = {
  normal: {
    front: 70,
    standard: 130,
    premium: 180,
    back: 200,
  },
  fdfs: {
    front: 100,
    standard: 180,
    premium: 250,
    back: 300,
  },
};