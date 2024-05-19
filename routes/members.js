var express = require('express');
var router = express.Router();

const memberController = require('../controllers/member')
router.post('/create', memberController.create);

module.exports = router