const express = require('express');
const {generateTabelLinks} = require('../controller/tabelController');

const router = express.Router();

router.post('/generate-tables',generateTabelLinks);

module.exports = router;
