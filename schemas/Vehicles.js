const mongoose = require('mongoose');

const vehiclesSchema = new mongoose.Schema({
    DOL_VEHICLE_ID: {
        type: String,
    },
    VIN: {
        type: String
    },
    BASE_MSRP: {
        type: String
    },
    YEAR: {
        type: String
    },
    LEGISLATIVE: {
        type: String
    },
    ELETRIC_UTILITY: {
        type: String
    },
    VEHICLE_LOCATION: {
        type: String
    },
    MANUFACTURERS_MAKE: {
        type: String,
    },
    VEHICLE_OWNER_CENSUS_TRACT: {
        type: String,
    },
    ELECTR_ELECTRIC_RANGE: {
        type: String,
    },
    VEHICLE_OWNER_INFOS_CITY: {
        type: String,
    },
    VEHICLE_OWNER_INFOS_POSTAL: {
        type: String,
    },
    MANUFACTURERS_MODEL: {
        type: String,
    },
});

//virtusal reference for manufacturers
vehiclesSchema.virtual('manufacturersMakeRef', {
    ref: 'manufacturers',
    localField: 'MANUFACTURERS_MAKE',
    foreignField: 'MAKE',
    justOne: true
});
vehiclesSchema.virtual('manufacturersModelRef', {
    ref: 'manufacturers',
    localField: 'MANUFACTURERS_MODEL',
    foreignField: 'MODEL',
    justOne: true
});

const vehicles = mongoose.model('vehicles', vehiclesSchema);

module.exports = vehicles;