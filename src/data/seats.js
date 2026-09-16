// src/data/seats.js

// Rows and how many seats in each row
export const seatLayout = [
  { row: 'A', seats: 8, type: 'front' },
  { row: 'B', seats: 8, type: 'front' },
  { row: 'C', seats: 8, type: 'standard' },
  { row: 'D', seats: 8, type: 'standard' },
  { row: 'E', seats: 8, type: 'premium' },
  { row: 'F', seats: 8, type: 'premium' },
  { row: 'G', seats: 8, type: 'back' },
  { row: 'H', seats: 8, type: 'back' },
];

// Some seats are already booked (demo)
export const bookedSeats = ['A3', 'A4', 'C5', 'D2', 'E6', 'F1', 'G4', 'H7'];