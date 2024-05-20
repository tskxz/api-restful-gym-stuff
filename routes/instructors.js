var express = require('express');
var router = express.Router();

const instructorController = require('../controllers/instructor')
router.post('/create', instructorController.create);

module.exports = router