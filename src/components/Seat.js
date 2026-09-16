// src/components/Seat.js

function Seat({ seatId, status, onClick }) {
  let bgColor = 'bg-green-500 hover:bg-green-400'; // available
  let cursor = 'cursor-pointer';

  if (status === 'selected') {
    bgColor = 'bg-purple-600';
  } else if (status === 'booked') {
    bgColor = 'bg-gray-600';
    cursor = 'cursor-not-allowed';
  }

  return (
    <button
      onClick={onClick}
      disabled={status === 'booked'}
      className={`w-9 h-9 md:w-10 md:h-10 rounded-md text-xs font-medium text-white transition-all ${bgColor} ${cursor}`}
      title={seatId}
    >
      {seatId.replace(/[A-Z]/, '')}
    </button>
  );
}

export default Seat;