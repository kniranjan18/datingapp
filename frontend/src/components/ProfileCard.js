import React from 'react';

const ProfileCard = ({ profile, showActions, onLike, onDislike }) => {
    const defaultPhoto = 'https://via.placeholder.com/400x500?text=No+Photo';

    return (
        <div className="profile-card">
            <div className="profile-image">
                <img
                    src={profile.photo || defaultPhoto}
                    alt={profile.name}
                    onError={(e) => { e.target.src = defaultPhoto; }}
                />
            </div>

            <div className="profile-info">
                <h2 className="profile-name">
                    {profile.name}, {profile.age}
                </h2>

                {profile.bio && (
                    <p className="profile-bio">{profile.bio}</p>
                )}

                {profile.interests && profile.interests.length > 0 && (
                    <div className="profile-interests">
                        {profile.interests.map((interest, index) => (
                            <span key={index} className="interest-tag">
                                {interest}
                            </span>
                        ))}
                    </div>
                )}

                {showActions && (
                    <div className="profile-actions">
                        <button
                            className="action-btn dislike-btn"
                            onClick={() => onDislike(profile._id)}
                            title="Pass"
                        >
                            ✕
                        </button>
                        <button
                            className="action-btn like-btn"
                            onClick={() => onLike(profile._id)}
                            title="Like"
                        >
                            ❤️
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfileCard;
