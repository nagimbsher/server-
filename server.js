const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config(); 

const app = express();
const PORT = process.env.PORT || 3001;
// Middleware
app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log('Request Body:', req.body);
  next();
});

const RentinRoutes = require('./routes/RentinRoutes');
app.use('/renting', RentinRoutes);

// Routes
const airbnbRoutes = require('./routes/airbnbRoutes');
const authRoutes = require('./routes/authRoutes'); 

app.use('/airbnb', airbnbRoutes);
app.use('/auth', authRoutes); 

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

