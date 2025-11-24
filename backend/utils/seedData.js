require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const connectDB = require('../config/db');

const users = [
    {
        name: 'Sarah Johnson',
        email: 'sarah@example.com',
        password: 'password123',
        age: 25,
        gender: 'female',
        bio: 'Love hiking, coffee, and good conversations. Looking for someone adventurous!',
        interests: ['hiking', 'coffee', 'travel', 'photography'],
        photo: 'https://i.pravatar.cc/400?img=1',
        location: { lat: 40.7128, lng: -74.0060 }, // New York
    },
    {
        name: 'Michael Chen',
        email: 'michael@example.com',
        password: 'password123',
        age: 28,
        gender: 'male',
        bio: 'Software engineer by day, chef by night. Foodie looking for a dining partner.',
        interests: ['cooking', 'tech', 'music', 'travel'],
        photo: 'https://i.pravatar.cc/400?img=12',
        location: { lat: 40.7580, lng: -73.9855 },
    },
    {
        name: 'Emily Rodriguez',
        email: 'emily@example.com',
        password: 'password123',
        age: 24,
        gender: 'female',
        bio: 'Artist and yoga enthusiast. Seeking creative souls and positive vibes.',
        interests: ['yoga', 'art', 'meditation', 'nature'],
        photo: 'https://i.pravatar.cc/400?img=5',
        location: { lat: 40.7489, lng: -73.9680 },
    },
    {
        name: 'James Wilson',
        email: 'james@example.com',
        password: 'password123',
        age: 30,
        gender: 'male',
        bio: 'Fitness trainer who loves the outdoors. Let\'s go on an adventure together!',
        interests: ['fitness', 'hiking', 'sports', 'outdoor'],
        photo: 'https://i.pravatar.cc/400?img=13',
        location: { lat: 40.7282, lng: -73.7949 },
    },
    {
        name: 'Olivia Taylor',
        email: 'olivia@example.com',
        password: 'password123',
        age: 26,
        gender: 'female',
        bio: 'Bookworm and coffee addict. Looking for someone to share lazy Sunday mornings.',
        interests: ['reading', 'coffee', 'movies', 'writing'],
        photo: 'https://i.pravatar.cc/400?img=9',
        location: { lat: 40.7589, lng: -73.9851 },
    },
    {
        name: 'David Kim',
        email: 'david@example.com',
        password: 'password123',
        age: 27,
        gender: 'male',
        bio: 'Music producer and dog lover. Swipe right if you want concert buddy!',
        interests: ['music', 'dogs', 'concerts', 'photography'],
        photo: 'https://i.pravatar.cc/400?img=14',
        location: { lat: 40.7614, lng: -73.9776 },
    },
    {
        name: 'Sophia Martinez',
        email: 'sophia@example.com',
        password: 'password123',
        age: 23,
        gender: 'female',
        bio: 'Dance instructor with a passion for life. Let\'s dance through this journey!',
        interests: ['dancing', 'music', 'fitness', 'travel'],
        photo: 'https://i.pravatar.cc/400?img=10',
        location: { lat: 40.7505, lng: -73.9934 },
    },
    {
        name: 'Ryan Anderson',
        email: 'ryan@example.com',
        password: 'password123',
        age: 29,
        gender: 'male',
        bio: 'Entrepreneur and travel enthusiast. 30 countries and counting!',
        interests: ['travel', 'business', 'photography', 'food'],
        photo: 'https://i.pravatar.cc/400?img=15',
        location: { lat: 40.7411, lng: -74.0098 },
    },
    {
        name: 'Ava Thompson',
        email: 'ava@example.com',
        password: 'password123',
        age: 25,
        gender: 'female',
        bio: 'Medical student who loves trying new restaurants and binge-watching shows.',
        interests: ['food', 'netflix', 'science', 'travel'],
        photo: 'https://i.pravatar.cc/400?img=20',
        location: { lat: 40.7648, lng: -73.9808 },
    },
    {
        name: 'Ethan Brown',
        email: 'ethan@example.com',
        password: 'password123',
        age: 31,
        gender: 'male',
        bio: 'Photographer capturing life\'s beautiful moments. Looking for my muse.',
        interests: ['photography', 'art', 'travel', 'nature'],
        photo: 'https://i.pravatar.cc/400?img=17',
        location: { lat: 40.7580, lng: -73.9855 },
    },
    {
        name: 'Isabella Garcia',
        email: 'isabella@example.com',
        password: 'password123',
        age: 24,
        gender: 'female',
        bio: 'Fashion designer with a love for vintage finds and spontaneous road trips.',
        interests: ['fashion', 'art', 'travel', 'shopping'],
        photo: 'https://i.pravatar.cc/400?img=16',
        location: { lat: 40.7489, lng: -73.9680 },
    },
    {
        name: 'Noah Davis',
        email: 'noah@example.com',
        password: 'password123',
        age: 28,
        gender: 'male',
        bio: 'Architect who enjoys sketching, cycling, and discovering hidden city gems.',
        interests: ['architecture', 'cycling', 'art', 'coffee'],
        photo: 'https://i.pravatar.cc/400?img=18',
        location: { lat: 40.7614, lng: -73.9776 },
    },
];

const seedDatabase = async () => {
    try {
        await connectDB();

        // Clear existing users
        await User.deleteMany({});
        console.log('Cleared existing users');

        // Create new users
        await User.insertMany(users);
        console.log('Successfully seeded database with dummy users');

        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();
