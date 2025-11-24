const Message = require('../models/Message');
const Match = require('../models/Match');

// @desc    Get messages for a match
// @route   GET /api/chat/:matchId
// @access  Private
const getMessages = async (req, res) => {
    try {
        const match = await Match.findById(req.params.matchId);

        if (!match) {
            return res.status(404).json({ message: 'Match not found' });
        }

        // Verify user is part of the match
        if (!match.users.includes(req.user._id)) {
            return res.status(403).json({ message: 'Not authorized to view these messages' });
        }

        const messages = await Message.find({ matchId: req.params.matchId })
            .populate('sender', 'name photo')
            .populate('receiver', 'name photo')
            .sort({ createdAt: 1 });

        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Send a message
// @route   POST /api/chat/:matchId
// @access  Private
const sendMessage = async (req, res) => {
    try {
        const { content, receiverId } = req.body;
        const match = await Match.findById(req.params.matchId);

        if (!match) {
            return res.status(404).json({ message: 'Match not found' });
        }

        // Verify user is part of the match
        if (!match.users.includes(req.user._id)) {
            return res.status(403).json({ message: 'Not authorized to send messages in this match' });
        }

        const message = await Message.create({
            matchId: req.params.matchId,
            sender: req.user._id,
            receiver: receiverId,
            content,
        });

        const populatedMessage = await Message.findById(message._id)
            .populate('sender', 'name photo')
            .populate('receiver', 'name photo');

        res.status(201).json(populatedMessage);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getMessages,
    sendMessage,
};
