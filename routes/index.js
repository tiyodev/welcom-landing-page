const express = require('express');

const router = express.Router();
const indexController = require('./../controllers/index');

router.get('/', indexController.getIndex);
router.post('/addMember', indexController.addMembers);

module.exports = router;
