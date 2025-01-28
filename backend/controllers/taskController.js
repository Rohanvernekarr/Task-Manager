const asyncHandler = require('express-async-handler');

// Mock database (replace with actual DB calls)
const tasks = [];

// Fetch user stats
exports.getStats = asyncHandler(async (req, res) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  res.json({ totalTasks, completedTasks, pendingTasks });
});

// Retrieve tasks
exports.getTasks = asyncHandler(async (req, res) => {
  const userTasks = tasks.filter((task) => task.userId === req.user.id); // Filter tasks by userId
  res.json(userTasks);
});

// Add a new task
exports.addTask = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ message: 'Title and description are required' });
  }

  const newTask = {
    id: tasks.length + 1,
    userId: req.user.id, // Assume `req.user` is set by the `protect` middleware
    title,
    description,
    completed: false, // Default status
  };

  tasks.push(newTask);
  res.status(201).json({ message: 'Task added successfully', task: newTask });
});
