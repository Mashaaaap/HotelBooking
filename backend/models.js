const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const Hotel = sequelize.define('Hotel', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    city: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    stars: {
        type: DataTypes.SMALLINT,
        validate: { min: 1, max: 5 }
    },
    email: {
        type: DataTypes.STRING(100),
        unique: true
    }
}, {
    tableName: 'Hotels',
    timestamps: false,
    underscored: true
});

const Clients = sequelize.define('Clients', {
    id: {
        type: DataTypes.INTEGER,    
        primaryKey: true,
        autoIncrement: true
    },
    firstName: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        unique: true
    },
    phone: {
        type: DataTypes.STRING(20)
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
}, {
    tableName: 'Clients',
    timestamps: false,
    underscored: true
});

const Rooms = sequelize.define('Rooms', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    hotelId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Hotel,
            key: 'id'
        }
    },
    roomNumber: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    type: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    tableName: 'Rooms',
    timestamps: false,
    underscored: true
});

const Bookings = sequelize.define('Bookings', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    clientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Clients,
            key: 'id'
        }
    },
    roomId: {   
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Rooms,
            key: 'id'
        }
    },
    checkInDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    checkOutDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    totalPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }, 
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'Bookings',
    timestamps: false,
    underscored: true
});

Hotel.hasMany(Rooms, { foreignKey: 'hotelId' });
Rooms.belongsTo(Hotel, { foreignKey: 'hotelId' });

Clients.hasMany(Bookings, { foreignKey: 'clientId' });
Bookings.belongsTo(Clients, { foreignKey: 'clientId' });

Rooms.hasMany(Bookings, { foreignKey: 'roomId' });
Bookings.belongsTo(Rooms, { foreignKey: 'roomId' });

module.exports = {
    Hotel,
    Clients,
    Rooms,
    Bookings
};