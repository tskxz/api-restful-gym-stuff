var express = require('express');
var router = express.Router();

const machineController = require('../controllers/machine')

router.post('/create', machineController.create);
router.get('/', machineController.view);
router.put('/update/:id', machineController.update);
router.delete('/delete/:id', machineController.deleteMachine)

module.exports = router