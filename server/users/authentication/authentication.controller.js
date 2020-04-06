const express = require('express');
const router = express.Router();
const HttpStatus = require('http-status-codes');

// JWT Token stuff
const jwt = require('jsonwebtoken');
const config = require('../../z_config/configDev.json');
const JWT_SECRET_KEY = config.JWT_SECRET_KEY;
const JWT_EXPIRY = config.JWT_EXPIRY

// const SuccessResponse = require('../model/response/SuccessResponse');

router.get('/test', (req, res) => {
    
    const testMsg = {
            "message": "authentication api test success"
        };

    res.status(HttpStatus.OK).json(testMsg);
});

// https://jwt.io/introduction/
/**
 * jwt can be signed using HMAC algorithm or public/private key using RSA or ECDSA
 * jwt structure 
 *      header
 *      payload
 *      signature
 *      
 *  header:
 *      two parts --> algorithm used to sign and the type of token (then the json stcuture is base64Url encoded)
 *  payload:
 *      contains the claims (statements about the entity)
 *      3 types of claims: registered claims, public claims, private claims
 *      ie) iss (issuer), exp(expiration time), sub (subject), aud(audience), etc
 *      ex) payload
 *      { "sub": 123, "name": "john doe", "admin": true} --> base64 url encoded as well
 *      
 *  signature:
 *      - encoded header, encoded payload, client secret, algorithm specified in header, and sign all of that
 *      ie) HMACSHA256(base64UrlEncode(header) + "." + base64UrlEncode(payload), secret)
 *      - verifies the message wasn't changed along the way (prevent man in middle attack) 
 */
router.post('/login', (req, res) =>{

    let userLogin = {};
    let username = req.body.username;
    let password = req.body.password;

    if (username !== "test" || password !== "test"){
        return res.status(HttpStatus.BAD_REQUEST).json({
            errorMsg: "username and/or password incorrect, please try again"
        });
    }

    // base64UrlEncode(header) + "." + base64UrlEncode(payload) + secret
    let token = jwt.sign({username}, JWT_SECRET_KEY,{
                algorithm: 'HS256',         // default is HS256 so don't need to explicitly set it
                expiresIn: JWT_EXPIRY    
            });

    console.log("token generated is: " + token);

    let decoded = jwt.verify(token, JWT_SECRET_KEY);
    console.log("decoded is: " + decoded);

    // store token in a cookie
    var today = new Date();
    var cookieExpirationDate = today.setMonth(today.getMonth() + 3);
    res.cookie('andrewcookie', token, {sameSite:true, maxAge:cookieExpirationDate})

    // var successResponse = new SuccessResponse(200, "login success");
    // successResponse.details = token;
    res.status(HttpStatus.OK).json({
        "status": 200,
        "message": "login successful",
        "jwtToken": token
    });
})

module.exports = router;