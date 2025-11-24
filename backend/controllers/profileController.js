const User = require('../models/User');

// @desc    Get user profile by ID
// @route   GET /api/profile/:id
// @access  Private
const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password -likedProfiles -dislikedProfiles');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update user profile
// @route   PUT /api/profile
// @access  Private
const updateProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update fields
        user.name = req.body.name || user.name;
        user.age = req.body.age || user.age;
        user.gender = req.body.gender || user.gender;
        user.bio = req.body.bio !== undefined ? req.body.bio : user.bio;
        user.interests = req.body.interests || user.interests;
        user.photo = req.body.photo !== undefined ? req.body.photo : user.photo;

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            age: updatedUser.age,
            gender: updatedUser.gender,
            bio: updatedUser.bio,
            interests: updatedUser.interests,
            photo: updatedUser.photo,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getProfile,
    updateProfile,
};
