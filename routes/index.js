const express = require('express');
const router = express.Router();
const vehiclesRouter = require('./vehicles');
const allDataRouter = require('./singleCollection');
require('../schemas/ElectricCategory');
require('../schemas/Manufacturer');
require('../schemas/VehicleOwnerInfo');
require('../schemas/SingleCollection');

//@route USE => / => /vehicles
//@access public
//@desc redirect all /vehicles routes to vehiclesRouteFile
router.use('/vehicles', vehiclesRouter);

router.use('/all', allDataRouter);


module.exports = router;