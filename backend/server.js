const express = require('express');
const sequelize = require('./db');
const cors = require('cors');
const bookingRoutes = require('./booking');

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api', bookingRoutes);

app.get('/', (req, res) => {
    res.send('Hotel Booking');
});

sequelize.authenticate()
    .then(() => {
        console.log('db connected');
        app.listen(5000, () => console.log('port 5000'));
    })
    .catch(err => console.error('Error connecting to DB:', err));