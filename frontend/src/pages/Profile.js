import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { profileAPI } from '../services/api';
import Navbar from '../components/Navbar';

const Profile = () => {
    const { user, updateProfile } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        gender: '',
        bio: '',
        interests: '',
        photo: '',
    });
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                age: user.age || '',
                gender: user.gender || '',
                bio: user.bio || '',
                interests: user.interests ? user.interests.join(', ') : '',
                photo: user.photo || '',
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Convert to base64
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, photo: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const updateData = {
                ...formData,
                age: parseInt(formData.age),
                interests: formData.interests.split(',').map(i => i.trim()).filter(i => i),
            };

            await profileAPI.updateProfile(updateData);
            await updateProfile();

            setMessage('Profile updated successfully!');
            setIsEditing(false);
        } catch (error) {
            setMessage('Failed to update profile');
        }

        setLoading(false);
    };

    if (!user) return null;

    return (
        <>
            <Navbar />
            <div className="page-container">
                <div className="profile-container">
                    <div className="profile-header">
                        <h1>My Profile</h1>
                        <button
                            className="btn-secondary"
                            onClick={() => setIsEditing(!isEditing)}
                        >
                            {isEditing ? 'Cancel' : 'Edit Profile'}
                        </button>
                    </div>

                    {message && (
                        <div className={`message ${message.includes('success') ? 'success' : 'error'}`}>
                            {message}
                        </div>
                    )}

                    {isEditing ? (
                        <form onSubmit={handleSubmit} className="profile-form">
                            <div className="form-group">
                                <label>Profile Photo</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handlePhotoUpload}
                                />
                                {formData.photo && (
                                    <img
                                        src={formData.photo}
                                        alt="Preview"
                                        className="photo-preview"
                                    />
                                )}
                            </div>

                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="age">Age</label>
                                    <input
                                        type="number"
                                        id="age"
                                        name="age"
                                        value={formData.age}
                                        onChange={handleChange}
                                        required
                                        min="18"
                                        max="100"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="gender">Gender</label>
                                    <select
                                        id="gender"
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Select</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="bio">Bio</label>
                                <textarea
                                    id="bio"
                                    name="bio"
                                    value={formData.bio}
                                    onChange={handleChange}
                                    rows="4"
                                    maxLength="500"
                                    placeholder="Tell us about yourself..."
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="interests">Interests (comma separated)</label>
                                <input
                                    type="text"
                                    id="interests"
                                    name="interests"
                                    value={formData.interests}
                                    onChange={handleChange}
                                    placeholder="e.g. hiking, coffee, travel, music"
                                />
                            </div>

                            <button type="submit" className="btn-primary" disabled={loading}>
                                {loading ? 'Saving...' : 'Save Changes'}
                            </button>
                        </form>
                    ) : (
                        <div className="profile-view">
                            <div className="profile-photo">
                                <img
                                    src={user.photo || 'https://via.placeholder.com/300'}
                                    alt={user.name}
                                />
                            </div>

                            <div className="profile-details">
                                <h2>{user.name}, {user.age}</h2>
                                <p className="profile-email">{user.email}</p>
                                <p className="profile-gender">Gender: {user.gender}</p>

                                {user.bio && (
                                    <div className="profile-section">
                                        <h3>About Me</h3>
                                        <p>{user.bio}</p>
                                    </div>
                                )}

                                {user.interests && user.interests.length > 0 && (
                                    <div className="profile-section">
                                        <h3>Interests</h3>
                                        <div className="interests-list">
                                            {user.interests.map((interest, index) => (
                                                <span key={index} className="interest-tag">
                                                    {interest}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Profile;
