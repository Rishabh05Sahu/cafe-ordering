const jwt = require('jsonwebtoken');

const token = req.headers['authorization'];

const decoded = jwt.verify(token, 'your_secret_key');
req.admin = decoded; 
next(); 