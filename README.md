# 🎬 BookMySeat

### Book Your Movie. Build Your Combo. Enjoy the Show.

BookMySeat is a beginner-friendly React-based cinema booking application that allows users to discover movies, explore theatres and showtimes, select seats, add snacks and combos, complete a checkout flow, and view their digital tickets and booking history.

🔗 **Live Demo:** [bookmyseat-movie.netlify.app](https://bookmyseat-movie.netlify.app/)

---

## 📸 About the Project

BookMySeat is designed as a complete frontend cinema booking experience.

The application combines real-time movie information from the TMDB API with a simple cinema booking workflow.

Users can:

- Browse trending and available movies
- Search and explore movies
- View movie details
- Explore theatre shows and showtimes
- Select cinema seats
- Add popcorn, drinks, snacks, and combos
- View and manage their cart
- Complete the checkout process
- Receive a digital booking ticket
- View previous bookings
- Login using a simple localStorage-based login system

---

## 🚀 Live Demo

👉 [bookmyseat-movie.netlify.app](https://bookmyseat-movie.netlify.app/)

---

## ✨ Features

### 🎥 Movie Discovery

- Trending movies
- Movie search
- Movie details
- Movie posters and ratings
- Release dates
- Movie languages
- TMDB API integration

### 🏢 Theatre & Show Selection

- Browse available theatres
- Select theatre
- Select screen
- Select date
- Select showtime
- Special/FDFS show support

### 💺 Seat Selection

- Cinema-style seat layout
- Available seats
- Selected seats
- Occupied seats
- Multiple seat selection
- Automatic ticket amount calculation

### 🍿 Snacks & Combos

Users can add cinema snacks such as:

- Classic Popcorn
- Cheese Popcorn
- Caramel Popcorn
- Coke
- Pepsi
- Sprite
- Fanta
- Cold Coffee
- Nachos
- French Fries
- Burgers
- Sandwiches
- Pizza
- Samosa
- Ice Cream
- Brownie
- Waffle
- Popcorn & Drink Combos
- Family Combos

### 🛒 Cart

- Movie ticket summary
- Snack summary
- Quantity management
- Price calculation
- Total amount

### 💳 Checkout

- Booking summary
- Customer details
- Ticket amount
- Snacks amount
- GST calculation
- Final total

### 🎟️ Digital Ticket

After completing a booking, users can view:

- Booking ID
- Movie
- Theatre
- Screen
- Date
- Show time
- Selected seats
- Snacks
- Total amount
- Customer details
- Digital ticket layout

### 📋 My Bookings

Users can view their previous bookings stored in the browser.

### 🔐 Login

Simple frontend login system using:

- Email
- Password
- LocalStorage

No backend authentication is used in this project.

---

## 🛠️ Technologies Used

| Technology | Usage |
|---|---|
| React.js | Frontend UI development |
| JavaScript | Application logic |
| HTML5 | Page structure |
| CSS3 | Styling |
| Tailwind CSS | Responsive UI styling |
| React Router DOM | Page navigation and routing |
| TMDB API | Movie and TV data |
| Fetch API | API requests |
| React Hooks | State and lifecycle management |
| LocalStorage | Login and booking data |
| Git | Version control |
| GitHub | Source code hosting |
| Netlify | Deployment |

---

## 📁 Project Structure

```text
BookMySeat/
│
├── public/
│   ├── logo.png
│   ├── _redirects
│   └── snacks/
│       ├── classic-popcorn.png.png
│       ├── cheese-popcorn.png.png
│       ├── coke.png.png
│       └── ...
│
├── src/
│   │
│   ├── components/
|   |   |── ChatbotAI.js
│   │   ├── Footer.js
│   │   ├── Loading.js
│   │   ├── MovieCard.js
│   │   ├── Navbar.js
│   │   └── Seat.js
│   │
│   ├── data/
│   │   ├── seats.js
│   │   ├── snacks.js
│   │   └── theatres.js
│   │
│   ├── pages/
│   │   ├── Cart.js
│   │   ├── Checkout.js
│   │   ├── Home.js
│   │   ├── Login.js
│   │   ├── MovieDetails.js
│   │   ├── Movies.js
│   │   ├── MyBookings.js
│   │   ├── SeatSelection.js
│   │   ├── Snacks.js
│   │   ├── TheatreShows.js
│   │   └── Ticket.js
│   │
│   ├── services/
│   │   └── tmdbApi.js
│   │
│   ├── App.css
│   ├── App.js
│   ├── App.test.js
│   ├── index.css
│   └── index.js
│
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── .env
```

> `.env` should not be committed to GitHub.

---

## 🔑 TMDB API Setup

This project uses the TMDB API to retrieve movie information.

Create a `.env` file in the project root:

```env
REACT_APP_TMDB_API_KEY=YOUR_TMDB_API_KEY

REACT_APP_GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

Replace `YOUR_TMDB_API_KEY` with your own TMDB API key.

Replace `YOUR_GEMINI_API_KEY` with your own GEMINI API key.

### Important

Do not upload your `.env` file to GitHub.

Make sure `.gitignore` contains:

```gitignore
.env
```

For the deployed Netlify application, the `REACT_APP_TMDB_API_KEY` & `REACT_APP_GEMINI_API_KEY`  environment variable should be configured in Netlify.

---

## 💻 Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/PraveenKumar7545/React_Project_BookMySeat.git
```

### 2. Open the project

```bash
cd BookMySeat
```

### 3. Install dependencies

```bash
npm install
```

### 4. Create the environment file

Create:

```text
.env
```

Add:

```env
REACT_APP_TMDB_API_KEY=YOUR_TMDB_API_KEY
```

### 5. Start the development server

```bash
npm start
```

The application will run at:

```text
http://localhost:3000
```

---

## 🌐 Deployment

The application is deployed using Netlify.

### Production Build

```bash
npm run build
```

The production files are generated inside:

```text
build/
```

### Netlify Configuration

```text
Build command:
npm run build

Publish directory:
build
```

The project uses React Router, so the `public/_redirects` file contains:

```text
/*    /index.html   200
```

This allows React Router routes to work correctly after deployment.

---

## 💾 Data Storage

This is a frontend-only project.

The application uses browser `localStorage` for:

- Login information
- Selected booking information
- Booking history
- Cart-related data

No external database is connected.

---

## 🎯 Main Application Flow

```text
Login
  ↓
Home
  ↓
Movies
  ↓
Movie Details
  ↓
Theatre & Show Selection
  ↓
Seat Selection
  ↓
Snacks & Combos
  ↓
Cart
  ↓
Checkout
  ↓
Digital Ticket
  ↓
My Bookings
```

---

## 📱 Responsive Design

The application is designed to work across:

- 💻 Desktop
- 💻 Laptop
- 📱 Mobile
- 📱 Tablet

Tailwind CSS utility classes are used to create the responsive interface.

---

## 🔮 Future Improvements

Possible future improvements include:

- Real user authentication
- Backend API
- Database integration
- Real payment gateway
- Real-time seat availability
- Booking cancellation
- Email booking confirmation
- QR code generation
- User profile management
- Theatre/admin dashboard
- Movie reviews and ratings

---

## ⚠️ Disclaimer

BookMySeat is an educational/portfolio project created for learning and demonstration purposes.

Movie information and images are provided through the TMDB API.

This project is not affiliated with or endorsed by TMDB.

---

## 👨‍💻 Developer

**Praveen Kumar M**

GitHub:  
https://github.com/PraveenKumar7545

---

## ⭐ Project

If you find this project useful or interesting, feel free to star the repository.

**Book Your Movie. Build Your Combo. Enjoy the Show. 🎬🍿**
