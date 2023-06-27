

const mongoose = require('mongoose');

const singleCollectionSchema = new mongoose.Schema({
    _id: {
        type: mongoose.SchemaTypes.ObjectId
    },
    VIN:{
        type: String
    },
    COUNTY: {
        type: String
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
    MODEL_YEAR: {
        type: String
    },
    MAKE: {
        type: String
    },
    MODEL: {
        type: String
    },
    ELECTRIC_VEHICLE_TYPE: {
        type: String
    },
    CLEAN_ALTERNATIVE_FUEL: {
        type: String
    },
    ELECTRIC_RANGE: {
        type: String
    },
    BASE_MSRP: {
        type: String
    },
    LEGISLATIVE_DISTRICT: {
        type: String
    },
    DOL_VEHICLE_ID: {
        type: String
    },
    VEHICLE_LOCATION: {
        type: String
    },
    ELECTRIC_UTILITY: {
        type: String
    },
    CENSUS_TRACT: {
        type: String
    }
  });

const singleCollection = mongoose.model('single_collection', singleCollectionSchema);

module.exports = singleCollection;