# ❤️ LoveConnect - MERN Stack Dating Application

A complete full-stack online dating application built with the MERN stack (MongoDB, Express, React, Node.js). Features include user authentication, profile management, swipe-based matching, real-time chat, and advanced search filters.

## ✨ Features

- **User Authentication**: Secure JWT-based registration and login with password hashing (bcrypt)
- **User Profiles**: Complete profile management with photo uploads, bio, interests, and editable information
- **Matching System**: Tinder-style swipe interface with like/dislike functionality and mutual match detection
- **Real-time Chat**: Socket.IO powered messaging system for matched users
- **Search Filters**: Filter profiles by age range, gender, and interests
- **Modern UI**: Beautiful dark-themed interface with smooth animations and responsive design
- **Mock Location**: Simulated nearby profiles using mock geolocation data

## 🛠️ Tech Stack

**Backend:**
- Node.js & Express.js
- MongoDB & Mongoose
- Socket.IO (real-time messaging)
- JWT (authentication)
- bcryptjs (password hashing)

**Frontend:**
- React (functional components)
- React Router (navigation)
- Context API (state management)
- Socket.IO Client
- Axios (HTTP requests)

## 📁 Project Structure

```
Dating app/
├── backend/
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js  # Authentication logic
│   │   ├── profileController.js
│   │   ├── discoverController.js
│   │   └── chatController.js
│   ├── middleware/
│   │   └── auth.js            # JWT verification
│   ├── models/
│   │   ├── User.js            # User schema
│   │   ├── Match.js           # Match schema
│   │   └── Message.js         # Message schema
│   ├── routes/
│   │   ├── auth.js
│   │   ├── profile.js
│   │   ├── discover.js
│   │   └── chat.js
│   ├── socket/
│   │   └── chatSocket.js      # Socket.IO handlers
│   ├── utils/
│   │   ├── generateToken.js
│   │   └── seedData.js        # Dummy user data
│   ├── server.js              # Main entry point
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   ├── PrivateRoute.js
│   │   │   └── ProfileCard.js
│   │   ├── context/
│   │   │   ├── AuthContext.js
│   │   │   └── SocketContext.js
│   │   ├── pages/
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── Profile.js
│   │   │   ├── Discover.js
│   │   │   ├── Matches.js
│   │   │   └── Chat.js
│   │   ├── services/
│   │   │   └── api.js         # API client
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
│
└── README.md
```

## 🚀 Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone or navigate to the project directory**

```bash
cd "Dating app"
```

2. **Set up the Backend**

```bash
cd backend

# Install dependencies
npm install

# Create .env file (copy from .env.example)
# Edit the .env file with your configuration:
# PORT=5000
# MONGODB_URI=mongodb://localhost:27017/dating-app
# JWT_SECRET=your_secret_key
# NODE_ENV=development
```

3. **Set up the Frontend**

```bash
cd ../frontend

# Install dependencies
npm install
```

4. **Seed the Database (Optional but Recommended)**

```bash
cd ../backend

# Run the seed script to create dummy users
npm run seed
```

This will create 12 sample user profiles with the following demo accounts:
- sarah@example.com / password123
- michael@example.com / password123
- emily@example.com / password123
- (and 9 more...)

## ▶️ Running the Application

You need to run both the backend and frontend servers simultaneously.

### Start the Backend Server

```bash
cd backend
npm start
```

The backend server will run on `http://localhost:5000`

### Start the Frontend Development Server

Open a new terminal window:

```bash
cd frontend
npm start
```

The frontend will run on `http://localhost:3000` and automatically open in your browser.

## 🔗 API Endpoints

### Authentication Routes
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Profile Routes
- `GET /api/profile/:id` - Get user profile by ID (protected)
- `PUT /api/profile` - Update user profile (protected)

### Discover Routes
- `GET /api/discover` - Get profiles with filters (protected)
  - Query params: `age_min`, `age_max`, `gender`, `interests`
- `POST /api/discover/like/:userId` - Like a profile (protected)
- `POST /api/discover/dislike/:userId` - Dislike a profile (protected)
- `GET /api/discover/matches` - Get all matches (protected)

### Chat Routes
- `GET /api/chat/:matchId` - Get messages for a match (protected)
- `POST /api/chat/:matchId` - Send a message (protected)

### Socket.IO Events
- `join_match` - Join a match room
- `send_message` - Send real-time message
- `receive_message` - Receive real-time message

## 📱 Application Flow

1. **Registration/Login**: Users can create an account or login with existing credentials
2. **Profile Setup**: Users can add a bio, interests, and profile photo
3. **Discover**: Browse other users' profiles with filtering options
4. **Swipe**: Like or dislike profiles (mutual likes create a match)
5. **Matches**: View all matched users
6. **Chat**: Send real-time messages to matches using Socket.IO

## 🎨 UI Features

- **Dark Theme**: Modern dark color scheme with vibrant gradients
- **Smooth Animations**: Transitions and micro-animations for enhanced UX
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Glassmorphism**: Card-based layouts with subtle glass effects
- **Real-time Updates**: Instant match notifications and live chat

## 🧪 Testing the Application

1. **Seed the database** with dummy users (see Setup Instructions)
2. **Login** with a demo account (e.g., sarah@example.com / password123)
3. **Update your profile** with a bio and interests
4. **Discover profiles** and try the swipe feature
5. **Create matches** by liking profiles (use another browser/incognito for the other user)
6. **Test chat** by opening the match and sending messages
7. **Test real-time messaging** by keeping both chat windows open

## 🔒 Security Features

- JWT token-based authentication
- Password hashing with bcryptjs (salt rounds: 10)
- Protected routes and API endpoints
- Token verification middleware
- Input validation and sanitization

## 🎯 Key Learning Points

This project demonstrates:
- Full MERN stack development
- RESTful API design
- Real-time communication with WebSockets (Socket.IO)
- JWT authentication flow
- React Context API for state management
- MongoDB schema design and relationships
- Modern React patterns (hooks, functional components)
- Responsive CSS design
- File upload handling (base64 encoding)

## 📝 Notes

- **Photo Storage**: Uses base64 encoding for simplicity. For production, consider cloud storage (AWS S3, Cloudinary)
- **Location Data**: Uses mock coordinates. Real geolocation would require additional APIs (Google Maps, etc.)
- **Security**: For production deployment, add rate limiting, input sanitization, and HTTPS
- **Scalability**: Consider Redis for session management and message queuing for large-scale deployment

## 🐛 Troubleshooting

**MongoDB Connection Error:**
- Ensure MongoDB is running locally
- Check the connection string in `.env`

**Port Already in Use:**
- Change the PORT in backend `.env` file
- Update the API_URL in frontend `src/services/api.js`

**Real-time Chat Not Working:**
- Verify both backend and frontend Socket.IO connections
- Check browser console for connection errors

## 📄 License

This project is for educational purposes.

## 🤝 Contributing

Feel free to fork, modify, and use this project for learning purposes!

---

Built with ❤️ using the MERN Stack
