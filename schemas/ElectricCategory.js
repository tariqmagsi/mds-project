const mongoose = require('mongoose');

const electricCategorySchema = new mongoose.Schema({
    _id: {
        type: mongoose.SchemaTypes.ObjectId
    },
    CLEAN_ALTERNATIVE_FUEL: {
        type: String,
    },
    ELECTRIC_RANGE: {
        type: String
    },
    modifiedOn: {
        type: Date,
        default: Date.now,
    },
});

const electricCategory = mongoose.model('electric_category', electricCategorySchema);

module.exports = electricCategory;