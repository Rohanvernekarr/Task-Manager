const express = require('express');
const { getStats, getTasks, addTask } = require('../controllers/taskController.js');
const { protect } = require('../middleware/auth.js');

const router = express.Router();

// Fetch user stats
router.get('/users/stats', protect, getStats);

// Retrieve tasks
router.get('/tasks', protect, getTasks);

// Add a new task
router.post('/tasks', protect, addTask);

module.exports = router;
