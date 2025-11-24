const Message = require('../models/Message');

const initializeSocket = (io) => {
    io.on('connection', (socket) => {
        console.log('New client connected:', socket.id);

        // Join a match room
        socket.on('join_match', (matchId) => {
            socket.join(matchId);
            console.log(`Socket ${socket.id} joined match: ${matchId}`);
        });

        // Send message
        socket.on('send_message', async (data) => {
            try {
                const { matchId, senderId, receiverId, content } = data;

                // Save message to database
                const message = await Message.create({
                    matchId,
                    sender: senderId,
                    receiver: receiverId,
                    content,
                });

                const populatedMessage = await Message.findById(message._id)
                    .populate('sender', 'name photo')
                    .populate('receiver', 'name photo');

                // Broadcast to all clients in the match room
                io.to(matchId).emit('receive_message', populatedMessage);
            } catch (error) {
                console.error('Error sending message:', error);
                socket.emit('message_error', { message: error.message });
            }
        });

        // Disconnect
        socket.on('disconnect', () => {
            console.log('Client disconnected:', socket.id);
        });
    });
};

module.exports = initializeSocket;
