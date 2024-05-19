var express = require('express');
var router = express.Router();

const machineController = require('../controllers/machine')

router.post('/create', machineController.create);
router.get('/', machineController.view);

module.exports = router