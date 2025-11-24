const express = require('express');
const {
    getProfiles,
    likeProfile,
    dislikeProfile,
    getMatches
} = require('../controllers/discoverController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/', protect, getProfiles);
router.post('/like/:userId', protect, likeProfile);
router.post('/dislike/:userId', protect, dislikeProfile);
router.get('/matches', protect, getMatches);

module.exports = router;
