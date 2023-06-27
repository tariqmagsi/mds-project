const express = require('express');
const Vehicles = require('../schemas/Vehicles');
const Manufacturers = require('../schemas/Manufacturer');
const VehicleOwnerInfos = require('../schemas/VehicleOwnerInfo');
const ElectricCategory = require('../schemas/ElectricCategory');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const r = await Vehicles.aggregate([
            { $limit: 500 },
            {
                $lookup: {
                    from: "manufacturers",
                    let: {
                        make: "$MANUFACTURERS_MAKE",
                        model: "$MANUFACTURERS_MODEL"
                    },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ["$MAKE", "$$make"] },
                                        { $eq: ["$MODEL", "$$model"] }
                                    ]
                                }
                            }
                        }
                    ],
                    as: "manufacturer"
                }
            },{$lookup: {
                    from: "vehicle_owner_infos",
                    let: {
                        censusTract: "$VEHICLE_OWNER_CENSUS_TRACT",
                        postalCode: "$VEHICLE_OWNER_INFOS_POSTAL",
                        city: "$VEHICLE_OWNER_INFOS_CITY"
                    },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ["$CENSUS_TRACT", "$$censusTract"] },
                                        { $eq: ["$POSTAL_CODE", "$$postalCode"] },
                                        { $eq: ["$CITY", "$$city"] }
                                    ]
                                }
                            }
                        }
                    ],
                    as: "vehicle_owner_info"
                }
            },
            {
                $project: {
                    _id: 0,
                    MODEL: "$manufacturer.MODEL",
                    MAKE: "$manufacturer.MAKE",
                    CITY: "$vehicle_owner_info.CITY",
                    COUNTY: "$vehicle_owner_info.COUNTY",
                    count_electric: { $sum: 1 }
                }
            },
            {
                $group: {
                    _id: {
                        MODEL: "$MODEL",
                        MAKE: "$MAKE",
                        CITY: "$CITY",
                        COUNTY: "$COUNTY"
                    },
                    count_electric: { $sum: "$count_electric" }
                }
            },
            {
                $project: {
                    _id: 0,
                    MODEL: "$_id.MODEL",
                    MAKE: "$_id.MAKE",
                    CITY: "$_id.CITY",
                    COUNTY: "$_id.COUNTY",
                    count_electric: 1
                }
            }
        ])

        const explain = await Vehicles.aggregate([
            { $limit: 500 },
            {
                $lookup: {
                    from: "manufacturers",
                    let: {
                        make: "$MANUFACTURERS_MAKE",
                        model: "$MANUFACTURERS_MODEL"
                    },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ["$MAKE", "$$make"] },
                                        { $eq: ["$MODEL", "$$model"] }
                                    ]
                                }
                            }
                        }
                    ],
                    as: "manufacturer"
                }
            },
            {
                $lookup: {
                    from: "vehicle_owner_infos",
                    let: {
                        censusTract: "$VEHICLE_OWNER_CENSUS_TRACT",
                        postalCode: "$VEHICLE_OWNER_INFOS_POSTAL",
                        city: "$VEHICLE_OWNER_INFOS_CITY"
                    },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ["$CENSUS_TRACT", "$$censusTract"] },
                                        { $eq: ["$POSTAL_CODE", "$$postalCode"] },
                                        { $eq: ["$CITY", "$$city"] }
                                    ]
                                }
                            }
                        }
                    ],
                    as: "vehicle_owner_info"
                }
            },
            {
                $project: {
                    _id: 0,
                    MODEL: "$manufacturer.MODEL",
                    MAKE: "$manufacturer.MAKE",
                    CITY: "$vehicle_owner_info.CITY",
                    COUNTY: "$vehicle_owner_info.COUNTY",
                    count_electric: { $sum: 1 }
                }
            },
            {
                $group: {
                    _id: {
                        MODEL: "$MODEL",
                        MAKE: "$MAKE",
                        CITY: "$CITY",
                        COUNTY: "$COUNTY"
                    },
                    count_electric: { $sum: "$count_electric" }
                }
            },
            {
                $project: {
                    _id: 0,
                    MODEL: "$_id.MODEL",
                    MAKE: "$_id.MAKE",
                    CITY: "$_id.CITY",
                    COUNTY: "$_id.COUNTY",
                    count_electric: 1
                }
            }
        ]).explain()


        res.status(200).json({ result: r, explain });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

module.exports = router;