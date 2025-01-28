const express = require("express");
const cors = require("cors");  
const dotenv = require("dotenv");
const connectDB = require('./config/database.js');
const authRoutes = require('./routes/auth.routes.js');
const userRoutes = require('./routes/user.routes.js');
const { errorHandler } = require('./middleware/errorHandler.js');

dotenv.config();

const app = express();

app.use(cors());  
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
