const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('HotelBooking', 'hotel_admin', 'Hotel123!', {
    host: 'localhost\\SQLEXPRESS',
    dialect: 'mssql',
    dialectOptions: {
        options: {
            encrypt: false,
            trustServerCertificate: true,
        }
    }
})

module.exports = sequelize;