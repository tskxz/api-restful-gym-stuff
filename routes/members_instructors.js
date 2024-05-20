var express = require('express');
var router = express.Router();

const member_instructorsController = require('../controllers/member_instructors')
router.post('/create', member_instructorsController.create)
router.get('/', member_instructorsController.getMemberInstructor)

module.exports = router