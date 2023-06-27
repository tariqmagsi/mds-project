const mongoose = require('mongoose');

const vehicleOwnerInfoSchema = new mongoose.Schema({
    _id: {
        type: mongoose.SchemaTypes.ObjectId
    },
    COUNTY: {
        type: String,
    },
    CITY: {
        type: String
    },
    STATE: {
        type: String
    },
    POSTAL_CODE: {
        type: String
    },
    CENSUS_TRACT: {
        type: String
    },
    modifiedOn: {
        type: Date,
        default: Date.now,
    },
});

const vehicleOwnerInfo = mongoose.model('vehicle_owner_infos', vehicleOwnerInfoSchema);

module.exports = vehicleOwnerInfo;