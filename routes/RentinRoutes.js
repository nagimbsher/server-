const express = require('express');
const router = express.Router();
const RentinController = require('../controllers/RentinController');


router.get('/', RentinController.getAllRentals);
router.get('/renting', RentinController.getAllRentals);
router.post('/', RentinController.createRental);
router.put('/', RentinController.updateRental);
router.get('/renting', RentinController.getAllRentals);

router.post('/renting', RentinController.createRental);

router.put('/renting/:rental_id', RentinController.updateRental);

router.delete('/renting/:rental_id', RentinController.deleteRental);

module.exports = router;
