const express = require('express');

const router = express.Router();
const learnMoreController = require('./../controllers/learnmore');

router.get('/', learnMoreController.getLearnMore);

module.exports = router;
