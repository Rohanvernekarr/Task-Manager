const express = require('express');
const { getProfile, updateProfile } = require('../controllers/userController.js');
const { protect } = require('../middleware/auth.js');

const router = express.Router();

router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);

module.exports = router;
