var express = require('express');
var router = express.Router();

const instructorController = require('../controllers/instructor')
router.post('/create', instructorController.create);
router.put('/update/:id', instructorController.update);

module.exports = router