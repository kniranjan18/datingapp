# 🚀 Quick Start Guide

Follow these simple steps to run the LoveConnect dating app locally:

## Step 1: Start MongoDB

Make sure MongoDB is running on your system.

**Windows:**
```bash
# MongoDB should be running as a service
# Or start it manually:
mongod
```

**Mac/Linux:**
```bash
sudo service mongod start
# or
brew services start mongodb-community
```

## Step 2: Seed the Database

Open a terminal and run:

```bash
cd "c:\Users\niranjan\OneDrive\Desktop\Dating app\backend"
npm run seed
```

This creates 12 demo users you can use to test the app.

## Step 3: Start the Backend

In the same terminal or a new one:

```bash
cd "c:\Users\niranjan\OneDrive\Desktop\Dating app\backend"
npm start
```

You should see: "Server running on port 5000" and "MongoDB Connected"

## Step 4: Start the Frontend

Open a NEW terminal window:

```bash
cd "c:\Users\niranjan\OneDrive\Desktop\Dating app\frontend"
npm start
```

The app will open in your browser at `http://localhost:3000`

## Step 5: Test the App

1. **Login** with a demo account:
   - Email: `sarah@example.com`
   - Password: `password123`

2. **Discover** profiles and swipe (like/dislike)

3. **Create a match**: 
   - Open an incognito/private browser window
   - Login as another user (e.g., `michael@example.com` / `password123`)
   - Like Sarah's profile
   - Both users should see a match!

4. **Test chat**:
   - Go to Matches page
   - Click on a match
   - Send messages in real-time!

## Demo Accounts

All demo accounts use password: `password123`

- sarah@example.com (Female, 25)
- michael@example.com (Male, 28)
- emily@example.com (Female, 24)
- james@example.com (Male, 30)
- olivia@example.com (Female, 26)
- david@example.com (Male, 27)
- sophia@example.com (Female, 23)
- ryan@example.com (Male, 29)
- ava@example.com (Female, 25)
- ethan@example.com (Male, 31)
- isabella@example.com (Female, 24)
- noah@example.com (Male, 28)

## Troubleshooting

**"MongoDB not connected":**
- Make sure MongoDB is running
- Check the connection string in `backend/.env`

**Port 5000 already in use:**
- Stop any other apps using port 5000
- Or change PORT in `backend/.env`

**Frontend can't connect to backend:**
- Make sure backend is running on port 5000
- Check the API_URL in `frontend/src/services/api.js`

## Features to Test

✅ User registration and login  
✅ Profile editing with photo upload  
✅ Browse profiles with filters  
✅ Like/dislike swiping  
✅ Mutual match detection  
✅ Real-time chat with Socket.IO  
✅ Match list view  

Enjoy exploring the app! ❤️
