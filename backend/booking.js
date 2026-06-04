const express = require('express')
const router = express.Router()
const { Op } = require('sequelize')
const { Bookings, Rooms } = require('./models')
const sequelize = require('./db')
const NodeCache = require('node-cache')
const cache = new NodeCache({ stdTTL: 60 }) 

// 1. Доступні кімнати
router.get('/rooms/available', async (req, res) => {
    try {
        const { checkIn, checkOut } = req.query
        const cacheKey = `availableRooms_${checkIn}_${checkOut}`
        const cachedRooms = cache.get(cacheKey)

        if (cachedRooms) {
            return res.json(cachedRooms)
        }
        
        const bookedRoomIds = await Bookings.findAll({
            where: {
                checkInDate: { [Op.lt]: checkOut },
                checkOutDate: { [Op.gt]: checkIn }
            },
            attributes: ['roomId']
        });

        const ids = bookedRoomIds.map(b => b.roomId)

        const rooms = await Rooms.findAll({
            where: {
                id: { [Op.notIn]: ids.length ? ids : [0] }
            }
        });

        cache.set(cacheKey, rooms)
        res.json(rooms)
        
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 2. Додати бронювання
router.post('/bookings', async (req, res) => {
    try {
        const { clientId, roomId, checkInDate, checkOutDate, totalPrice } = req.body;

        const booking = await Bookings.create({
            clientId,
            roomId,
            checkInDate,
            checkOutDate,
            totalPrice
        });

        res.status(201).json(booking);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 3. Видалити бронювання
router.delete('/bookings/:id', async (req, res) => {
    try {
        const booking = await Bookings.findByPk(req.params.id);

        if (!booking) {
            return res.status(404).json({ error: 'Бронювання не знайдено' });
        }

        await booking.destroy();
        res.json({ message: 'Бронювання видалено' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;