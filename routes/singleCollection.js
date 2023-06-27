const express = require('express');
const singleCollection = require('../schemas/SingleCollection');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const res1 = await singleCollection.aggregate([
            {
                $group: {
                    _id: {
                        MODEL: "$MODEL",
                        MAKE: "$MAKE",
                        CITY: "$CITY",
                        COUNTY: "$COUNTY"
                    },
                    count_electric: { $sum: 1 }
                }
            },
            {
                $project: {
                    MODEL: "$_id.MODEL",
                    MAKE: "$_id.MAKE",
                    CITY: "$_id.CITY",
                    COUNTY: "$_id.COUNTY",
                    count_electric: 1,
                    _id: 0
                }
            },
            
        ])

        const explain = await singleCollection.aggregate([
            {
                $group: {
                    _id: {
                        MODEL: "$MODEL",
                        MAKE: "$MAKE",
                        CITY: "$CITY",
                        COUNTY: "$COUNTY"
                    },
                    count_electric: { $sum: 1 }
                }
            },
            {
                $project: {
                    MODEL: "$_id.MODEL",
                    MAKE: "$_id.MAKE",
                    CITY: "$_id.CITY",
                    COUNTY: "$_id.COUNTY",
                    count_electric: 1,
                    _id: 0
                }
            },
            
        ]).explain()

        res.status(200).json({ result: res1, explain });
    } catch(err) {
        return res.status(500).json({ error: err.message });
    }
})

module.exports = router;