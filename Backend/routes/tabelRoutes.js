const express = require('express');
const {generateTabelLinks,getAllTable} = require('../controller/tabelController');

const router = express.Router();

router.post('/generate-tables',generateTabelLinks);


module.exports = router;
