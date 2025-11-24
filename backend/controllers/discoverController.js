const User = require('../models/User');
const Match = require('../models/Match');

// @desc    Get profiles for discover page
// @route   GET /api/discover
// @access  Private
const getProfiles = async (req, res) => {
    try {
        const { age_min, age_max, gender, interests } = req.query;
        const currentUser = await User.findById(req.user._id);

        // Build query
        let query = {
            _id: {
                $ne: req.user._id, // Exclude current user
                $nin: [...currentUser.likedProfiles, ...currentUser.dislikedProfiles] // Exclude already interacted
            }
        };

        // Apply filters
        if (age_min || age_max) {
            query.age = {};
            if (age_min) query.age.$gte = parseInt(age_min);
            if (age_max) query.age.$lte = parseInt(age_max);
        }

        if (gender) {
            query.gender = gender;
        }

        if (interests) {
            const interestArray = interests.split(',').map(i => i.trim());
            query.interests = { $in: interestArray };
        }

        const profiles = await User.find(query)
            .select('-password -likedProfiles -dislikedProfiles')
            .limit(20);

        res.json(profiles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Like a profile
// @route   POST /api/discover/like/:userId
// @access  Private
const likeProfile = async (req, res) => {
    try {
        const currentUser = await User.findById(req.user._id);
        const likedUser = await User.findById(req.params.userId);

        if (!likedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if already liked
        if (currentUser.likedProfiles.includes(likedUser._id)) {
            return res.status(400).json({ message: 'Already liked this profile' });
        }

        // Add to liked profiles
        currentUser.likedProfiles.push(likedUser._id);
        await currentUser.save();

        // Check if it's a mutual match
        let isMatch = false;
        let match = null;

        if (likedUser.likedProfiles.includes(currentUser._id)) {
            // Create a match
            match = await Match.create({
                users: [currentUser._id, likedUser._id]
            });
            isMatch = true;
        }

        res.json({
            message: 'Profile liked',
            isMatch,
            match,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Dislike a profile
// @route   POST /api/discover/dislike/:userId
// @access  Private
const dislikeProfile = async (req, res) => {
    try {
        const currentUser = await User.findById(req.user._id);
        const dislikedUser = await User.findById(req.params.userId);

        if (!dislikedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if already disliked
        if (currentUser.dislikedProfiles.includes(dislikedUser._id)) {
            return res.status(400).json({ message: 'Already disliked this profile' });
        }

        // Add to disliked profiles
        currentUser.dislikedProfiles.push(dislikedUser._id);
        await currentUser.save();

        res.json({ message: 'Profile disliked' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all matches for current user
// @route   GET /api/matches
// @access  Private
const getMatches = async (req, res) => {
    try {
        const matches = await Match.find({
            users: req.user._id
        })
            .populate('users', '-password -likedProfiles -dislikedProfiles')
            .sort({ createdAt: -1 });

        res.json(matches);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getProfiles,
    likeProfile,
    dislikeProfile,
    getMatches,
};
