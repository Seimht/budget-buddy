const express = require('express');
const router = express.Router();
const { daily } = require('../controllers/quoteController');

router.get('/', daily);

module.exports = router;
