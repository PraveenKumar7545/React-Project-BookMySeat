// src/pages/TheatreShows.js 
import { useState, useEffect } from 'react'; 
import { useParams, useNavigate, Link } from 'react-router-dom'; 
import { malls, theatres, normalShowTimes, specialShowTimes, ticketPrices } from '../data/theatres'; 
 
function TheatreShows() { 
  const { id } = useParams(); 
  const navigate = useNavigate(); 
 
  const [selectedMall, setSelectedMall] = useState(null); 
  const [selectedTheatre, setSelectedTheatre] = useState(null); 
  const [selectedDate, setSelectedDate] = useState(''); 
  const [selectedShow, setSelectedShow] = useState(''); 
  const [isSpecialShow, setIsSpecialShow] = useState(false); 
 
  const movie = JSON.parse(localStorage.getItem('cineseat_selected_movie') || 'null'); 
 
  // Generate next 5 days 
  const getUpcomingDates = () => { 
    const dates = []; 
    for (let i = 0; i < 5; i++) { 
      const date = new Date(); 
      date.setDate(date.getDate() + i); 
      dates.push({ 
        value: date.toISOString().split('T')[0], 
        label: date.toLocaleDateString('en-IN', { 
          weekday: 'short', 
          day: 'numeric', 
          month: 'short', 
        }), 
      }); 
    } 
    return dates; 
  }; 
 
  const dates = getUpcomingDates(); 
 
  // Filter theatres based on selected mall 
  const filteredTheatres = selectedMall 
    ? theatres.filter((t) => t.mallId === selectedMall.id) 
    : []; 
 
  useEffect(() => { 
    if (movie) { 
      const specialKeywords = ['Avengers', 'Spider', 'Batman', 'Joker', 'Deadpool', 'Oppenheimer']; 
      const isSpecial = specialKeywords.some((word) => 
        movie.title?.toLowerCase().includes(word.toLowerCase()) 
      ); 
      setIsSpecialShow(isSpecial); 
    } 
  }, [movie]); 
 
  const showTimes = isSpecialShow ? specialShowTimes : normalShowTimes; 
  const prices = isSpecialShow ? ticketPrices.fdfs : ticketPrices.normal; 
 
  const handleContinue = () => { 
    if (!selectedMall || !selectedTheatre || !selectedDate || !selectedShow) { 
      alert('Please select Mall, Theatre, Date and Show Time'); 
      return; 
    } 
 
    const bookingData = { 
      movie: movie, 
      mall: selectedMall, 
      theatre: selectedTheatre, 
      date: selectedDate, 
      showTime: selectedShow, 
      isSpecialShow: isSpecialShow, 
      prices: prices, 
    }; 
 
    localStorage.setItem('cineseat_booking', JSON.stringify(bookingData)); 
    navigate(`/seats/${id}`); 
  }; 
 
  if (!movie) { 
    return ( 
      <div className="flex-grow flex items-center justify-center p-6 text-center"> 
        <div> 
          <p className="text-xl text-black mb-4">No movie selected</p> 
          <Link to="/movies" className="text-black hover:text-gray-800"> 
            ← Go to Movies 
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
          <Link to={`/movie/${id}`} className="text-black hover:text-gray-800 text-sm mb-4 inline-block"> 
            ← Back to Movie 
          </Link> 
          <h1 className="text-3xl md:text-4xl font-bold text-black mb-2"> 
            Select Mall, Theatre & Show 
          </h1> 
          <p className="text-black"> 
            Movie: <span className="text-black font-medium">{movie.title}</span> 
          </p> 
          {isSpecialShow && ( 
            <span className="inline-block mt-2 bg-yellow-500/20 text-yellow-300 text-xs font-semibold px-3 py-1 rounded-full"> 
              ⭐ FDFS / Special Show Pricing Applied 
            </span> 
          )} 
        </div> 
 
        {/* 1. Select Mall */} 
        <div className="mb-10"> 
          <h2 className="text-xl font-semibold text-black mb-4">1. Choose Mall (Chennai)</h2> 
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"> 
            {malls.map((mall) => ( 
              <div 
                key={mall.id} 
                onClick={() => { 
                  setSelectedMall(mall); 
                  setSelectedTheatre(null); // reset theatre when mall changes 
                }} 
                className={`p-5 rounded-2xl border cursor-pointer transition-all duration-200 ${ 
                  selectedMall?.id === mall.id 
                    ? 'bg-black border-black shadow-lg' 
                    : 'bg-white/5 border-white/10 hover:border-gray-400' 
                }`} 
              > 
                <h3 className={`text-lg font-semibold ${selectedMall?.id === mall.id ? 'text-white' : 'text-black'}`}>{mall.name}</h3> 
                <p className={`text-sm mt-1 ${selectedMall?.id === mall.id ? 'text-white' : 'text-black'}`}>{mall.city}</p> 
              </div> 
            ))} 
          </div> 
        </div> 
 
        {/* 2. Select Theatre (only shows after mall is selected) */} 
        {selectedMall && ( 
          <div className="mb-10"> 
            <h2 className="text-xl font-semibold text-black mb-4"> 
              2. Choose Theatre in {selectedMall.name} 
            </h2> 
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"> 
              {filteredTheatres.map((theatre) => ( 
                <div 
                  key={theatre.id} 
                  onClick={() => setSelectedTheatre(theatre)} 
                  className={`p-5 rounded-2xl border cursor-pointer transition-all duration-200 ${ 
                    selectedTheatre?.id === theatre.id 
                      ? 'bg-black border-black shadow-lg' 
                      : 'bg-white/5 border-white/10 hover:border-gray-400' 
                  }`} 
                > 
                  <h3 className={`text-lg font-semibold ${selectedTheatre?.id === theatre.id ? 'text-white' : 'text-black'}`}>{theatre.name}</h3> 
                  <p className={`text-sm mt-1 ${selectedTheatre?.id === theatre.id ? 'text-white' : 'text-black'}`}>{theatre.screen}</p> 
                </div> 
              ))} 
            </div> 
          </div> 
        )} 
 
        {/* 3. Select Date */} 
        <div className="mb-10"> 
          <h2 className="text-xl font-semibold text-black mb-4">3. Choose Date</h2> 
          <div className="flex flex-wrap gap-3"> 
            {dates.map((date) => ( 
              <button 
                key={date.value} 
                onClick={() => setSelectedDate(date.value)} 
                className={`px-5 py-3 rounded-xl font-medium transition-all ${ 
                  selectedDate === date.value 
                    ? 'bg-black text-white shadow-lg' 
                    : 'bg-white/10 text-black hover:bg-gray-200' 
                }`} 
              > 
                {date.label} 
              </button> 
            ))} 
          </div> 
        </div> 
 
        {/* 4. Select Show Time */} 
        <div className="mb-10"> 
          <h2 className="text-xl font-semibold text-black mb-4">4. Choose Show Time</h2> 
          <div className="flex flex-wrap gap-3"> 
            {showTimes.map((time) => ( 
              <button 
                key={time} 
                onClick={() => setSelectedShow(time)} 
                className={`px-6 py-3 rounded-xl font-medium transition-all ${ 
                  selectedShow === time 
                    ? 'bg-black text-white shadow-lg' 
                    : 'bg-white/10 text-black hover:bg-gray-200' 
                }`} 
              > 
                {time} 
              </button> 
            ))} 
          </div> 
        </div> 
 
        {/* Price Preview */} 
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8"> 
          <h3 className="text-black font-semibold mb-3">Ticket Price Preview</h3> 
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center"> 
            <div> 
              <p className="text-sm text-black">Front</p> 
              <p className="text-lg font-bold">₹{prices.front}</p> 
            </div> 
            <div> 
              <p className="text-sm text-black">Standard</p> 
              <p className="text-lg font-bold">₹{prices.standard}</p> 
            </div> 
            <div> 
              <p className="text-sm text-black">Premium</p> 
              <p className="text-lg font-bold">₹{prices.premium}</p> 
            </div> 
            <div> 
              <p className="text-sm text-black">Back</p> 
              <p className="text-lg font-bold">₹{prices.back}</p> 
            </div> 
          </div> 
        </div> 
 
        {/* Continue Button */} 
        <button 
          onClick={handleContinue} 
          className="w-full sm:w-auto bg-black hover:bg-gray-800 text-white font-semibold px-10 py-4 rounded-xl transition-all shadow-lg" 
        > 
          Continue to Seat Selection 
        </button> 
      </div> 
    </div> 
  ); 
} 
 
export default TheatreShows;