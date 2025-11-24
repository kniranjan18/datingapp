import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { discoverAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';

const Matches = () => {
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        fetchMatches();
    }, []);

    const fetchMatches = async () => {
        setLoading(true);
        try {
            const { data } = await discoverAPI.getMatches();
            setMatches(data);
        } catch (error) {
            console.error('Error fetching matches:', error);
        }
        setLoading(false);
    };

    const getMatchedUser = (match) => {
        return match.users.find(u => u._id !== user._id);
    };

    const handleChatClick = (match) => {
        navigate(`/chat/${match._id}`);
    };

    return (
        <>
            <Navbar />
            <div className="page-container">
                <div className="matches-container">
                    <h1>Your Matches</h1>

                    {loading ? (
                        <div className="loading-container">
                            <div className="loader"></div>
                            <p>Loading matches...</p>
                        </div>
                    ) : matches.length > 0 ? (
                        <div className="matches-grid">
                            {matches.map((match) => {
                                const matchedUser = getMatchedUser(match);
                                return (
                                    <div
                                        key={match._id}
                                        className="match-card"
                                        onClick={() => handleChatClick(match)}
                                    >
                                        <img
                                            src={matchedUser.photo || 'https://via.placeholder.com/150'}
                                            alt={matchedUser.name}
                                            className="match-photo"
                                        />
                                        <div className="match-info">
                                            <h3>{matchedUser.name}, {matchedUser.age}</h3>
                                            <p className="match-date">
                                                Matched {new Date(match.createdAt).toLocaleDateString()}
                                            </p>
                                            <button className="chat-btn">
                                                💬 Start Chat
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="no-matches">
                            <h2>No matches yet</h2>
                            <p>Keep swiping to find your perfect match!</p>
                            <button
                                className="btn-primary"
                                onClick={() => navigate('/discover')}
                            >
                                Discover People
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Matches;
