const express = require('express');
const router = express.Router();
const path = require('path');
const utilities = require('../middleware/utilities');
const HttpStatus = require('http-status-codes')

router.get('/', (req, res) => {
    return res.send("hello from / route this");
})

router.get('/welcome', utilities.verifyToken, (req, res) => {
  
    console.log("token from /welcome endpoint: " + req.token);
    return res.status(HttpStatus.OK).sendFile(path.join(__dirname + '/../view/welcome.html'));
});

module.exports = router;