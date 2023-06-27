const mongoose = require('mongoose');

const manufacturerSchema = new mongoose.Schema({
    _id: {
        type: mongoose.SchemaTypes.ObjectId
    },
    MAKE: {
        type: String,
    },
    MODEL: {
        type: String
    },
    ELECTRIC_VEHICLE_TYPE: {
        type: String
    },
    modifiedOn: {
        type: Date,
        default: Date.now,
    },
});
  

const manufacturer = mongoose.model('manufacturers', manufacturerSchema);

module.exports = manufacturer;