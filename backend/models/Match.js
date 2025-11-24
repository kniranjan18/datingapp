const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }],
}, {
    timestamps: true,
});

// Ensure exactly 2 users per match
matchSchema.path('users').validate(function (value) {
    return value.length === 2;
}, 'A match must have exactly 2 users');

module.exports = mongoose.model('Match', matchSchema);
