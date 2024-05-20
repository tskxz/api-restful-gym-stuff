var express = require('express');
var router = express.Router();

const instructorController = require('../controllers/instructor')
router.post('/create', instructorController.create);
router.get('/', instructorController.read);
router.put('/update/:id', instructorController.update);
router.delete('/delete/:id', instructorController.deleteInstructor)
router.post('/checkCredentials', instructorController.checkCredentials)

module.exports = router