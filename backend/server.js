const express = require('express');
const sequelize = require('./db');
const cors = require('cors');
const bookingRoutes = require('./bookings')

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hotel Booking');
});

sequelize.authenticate()
    .then(() => {
        console.log('db connected');
        app.listen(3000, () => console.log('port 3000'));
    })
    .catch(err => console.error('Error connecting to DB:', err));