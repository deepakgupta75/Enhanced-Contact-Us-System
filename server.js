const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const contactRoutes = require('./routes/contact');
const QueryRoutes = require('./routes/contact');
const userRoutes = require('./routes/user');




dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
  });

//All Routes
app.use('/api/contact', contactRoutes);
app.use('/api/queries', QueryRoutes);
app.use('/api/sendmessage', userRoutes);



// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
