import React, { useState, useEffect } from 'react';
import { discoverAPI } from '../services/api';
import Navbar from '../components/Navbar';
import ProfileCard from '../components/ProfileCard';

const Discover = () => {
    const [profiles, setProfiles] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        age_min: '',
        age_max: '',
        gender: '',
        interests: '',
    });
    const [showFilters, setShowFilters] = useState(false);
    const [matchMessage, setMatchMessage] = useState('');

    useEffect(() => {
        fetchProfiles();
    }, []);

    const fetchProfiles = async (filterParams = {}) => {
        setLoading(true);
        try {
            const { data } = await discoverAPI.getProfiles(filterParams);
            setProfiles(data);
            setCurrentIndex(0);
        } catch (error) {
            console.error('Error fetching profiles:', error);
        }
        setLoading(false);
    };

    const handleLike = async (userId) => {
        try {
            const { data } = await discoverAPI.likeProfile(userId);

            if (data.isMatch) {
                setMatchMessage('🎉 It\'s a Match! Check your matches to start chatting!');
                setTimeout(() => setMatchMessage(''), 3000);
            }

            nextProfile();
        } catch (error) {
            console.error('Error liking profile:', error);
        }
    };

    const handleDislike = async (userId) => {
        try {
            await discoverAPI.dislikeProfile(userId);
            nextProfile();
        } catch (error) {
            console.error('Error disliking profile:', error);
        }
    };

    const nextProfile = () => {
        if (currentIndex < profiles.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            setProfiles([]);
        }
    };

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const applyFilters = () => {
        const filterParams = {};
        if (filters.age_min) filterParams.age_min = filters.age_min;
        if (filters.age_max) filterParams.age_max = filters.age_max;
        if (filters.gender) filterParams.gender = filters.gender;
        if (filters.interests) filterParams.interests = filters.interests;

        fetchProfiles(filterParams);
        setShowFilters(false);
    };

    const clearFilters = () => {
        setFilters({
            age_min: '',
            age_max: '',
            gender: '',
            interests: '',
        });
        fetchProfiles();
        setShowFilters(false);
    };

    const currentProfile = profiles[currentIndex];

    return (
        <>
            <Navbar />
            <div className="page-container">
                <div className="discover-container">
                    <div className="discover-header">
                        <h1>Discover</h1>
                        <button
                            className="btn-secondary"
                            onClick={() => setShowFilters(!showFilters)}
                        >
                            {showFilters ? 'Hide Filters' : 'Show Filters'}
                        </button>
                    </div>

                    {matchMessage && (
                        <div className="match-notification">
                            {matchMessage}
                        </div>
                    )}

                    {showFilters && (
                        <div className="filters-panel">
                            <div className="filter-row">
                                <div className="filter-group">
                                    <label>Min Age</label>
                                    <input
                                        type="number"
                                        name="age_min"
                                        value={filters.age_min}
                                        onChange={handleFilterChange}
                                        placeholder="18"
                                        min="18"
                                    />
                                </div>
                                <div className="filter-group">
                                    <label>Max Age</label>
                                    <input
                                        type="number"
                                        name="age_max"
                                        value={filters.age_max}
                                        onChange={handleFilterChange}
                                        placeholder="100"
                                        max="100"
                                    />
                                </div>
                                <div className="filter-group">
                                    <label>Gender</label>
                                    <select
                                        name="gender"
                                        value={filters.gender}
                                        onChange={handleFilterChange}
                                    >
                                        <option value="">All</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                            </div>
                            <div className="filter-group">
                                <label>Interests (comma separated)</label>
                                <input
                                    type="text"
                                    name="interests"
                                    value={filters.interests}
                                    onChange={handleFilterChange}
                                    placeholder="e.g. hiking, coffee"
                                />
                            </div>
                            <div className="filter-actions">
                                <button className="btn-primary" onClick={applyFilters}>
                                    Apply Filters
                                </button>
                                <button className="btn-secondary" onClick={clearFilters}>
                                    Clear
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="discover-content">
                        {loading ? (
                            <div className="loading-container">
                                <div className="loader"></div>
                                <p>Loading profiles...</p>
                            </div>
                        ) : currentProfile ? (
                            <ProfileCard
                                profile={currentProfile}
                                showActions={true}
                                onLike={handleLike}
                                onDislike={handleDislike}
                            />
                        ) : (
                            <div className="no-profiles">
                                <h2>No more profiles</h2>
                                <p>Try adjusting your filters or check back later!</p>
                                <button className="btn-primary" onClick={() => fetchProfiles()}>
                                    Refresh
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Discover;
