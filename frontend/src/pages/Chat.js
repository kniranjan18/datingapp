import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { chatAPI, discoverAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useSocket } from '../context/SocketContext';
import Navbar from '../components/Navbar';

const Chat = () => {
    const { matchId } = useParams();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [matchedUser, setMatchedUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const messagesEndRef = useRef(null);

    const { user } = useAuth();
    const { joinMatch, sendMessage, onReceiveMessage, offReceiveMessage } = useSocket();
    const navigate = useNavigate();

    useEffect(() => {
        if (matchId) {
            initializeChat();
            joinMatch(matchId);

            // Listen for new messages
            onReceiveMessage((message) => {
                setMessages(prev => [...prev, message]);
            });

            return () => {
                offReceiveMessage();
            };
        }
    }, [matchId]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const initializeChat = async () => {
        try {
            // Fetch messages
            const { data: messagesData } = await chatAPI.getMessages(matchId);
            setMessages(messagesData);

            // Fetch match info to get the other user
            const { data: matchesData } = await discoverAPI.getMatches();
            const currentMatch = matchesData.find(m => m._id === matchId);

            if (currentMatch) {
                const otherUser = currentMatch.users.find(u => u._id !== user._id);
                setMatchedUser(otherUser);
            }
        } catch (error) {
            console.error('Error initializing chat:', error);
        }
        setLoading(false);
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleSendMessage = (e) => {
        e.preventDefault();

        if (!newMessage.trim()) return;

        const messageData = {
            matchId,
            senderId: user._id,
            receiverId: matchedUser._id,
            content: newMessage.trim(),
        };

        sendMessage(messageData);
        setNewMessage('');
    };

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="loading-container">
                    <div className="loader"></div>
                    <p>Loading chat...</p>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className="page-container">
                <div className="chat-container">
                    <div className="chat-header">
                        <button className="back-btn" onClick={() => navigate('/matches')}>
                            ← Back
                        </button>
                        {matchedUser && (
                            <div className="chat-user-info">
                                <img
                                    src={matchedUser.photo || 'https://via.placeholder.com/50'}
                                    alt={matchedUser.name}
                                    className="chat-user-photo"
                                />
                                <h2>{matchedUser.name}</h2>
                            </div>
                        )}
                    </div>

                    <div className="messages-container">
                        {messages.length > 0 ? (
                            messages.map((message, index) => (
                                <div
                                    key={index}
                                    className={`message ${message.sender._id === user._id ? 'sent' : 'received'
                                        }`}
                                >
                                    <div className="message-content">
                                        <p>{message.content}</p>
                                        <span className="message-time">
                                            {new Date(message.createdAt).toLocaleTimeString([], {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}
                                        </span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="no-messages">
                                <p>No messages yet. Say hi to {matchedUser?.name}! 👋</p>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <form onSubmit={handleSendMessage} className="message-input-form">
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Type a message..."
                            className="message-input"
                        />
                        <button type="submit" className="send-btn" disabled={!newMessage.trim()}>
                            Send
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Chat;
