const HttpStatus = require('http-status-codes');
const config = require('../z_config/configDev.json');
const JWT_SECRET_KEY = config.JWT_SECRET_KEY;

const jwt = require('jsonwebtoken');

// verify token (move this out)
function verifyToken(req, res, next) {
    // retrieve headers
    var authorizationHeader = req.headers.authorization;
    var token = null;
    // check for bearer
    if (authorizationHeader && authorizationHeader.includes('Bearer ')) {    
        token = authorizationHeader.split(' ')[1];
    }
    if (token == null){
        return res.sendStatus(HttpStatus.UNAUTHORIZED);
    }
    // verify token
    jwt.verify(token, JWT_SECRET_KEY, (err, data) => {
        if (err) {
            console.log(jwt.decode(token))
            console.log(err);
            return res.sendStatus(HttpStatus.FORBIDDEN);
        }
        req.token = data;
        next();
    });
    // try {
    //     var decoded = jwt.verify(token, JWT_SECRET_KEY)
    //     console.log("token verification: " + token);
    // } catch (err) {
    //     return res.sendStatus(HttpStatus.FORBIDDEN);
    // }

    // req.token = token;
    // next();
}

function verifyTokenInCookie(req, res, next) {
    // retrieve headers
    var bearer;
    // if (req.cookies['andrewcookie']) {
    //     bearer = req.cookies['andrewcookie'];
    // }
    console.log("bearer token in cookie is: " + req.cookies);
    
    if (!bearer) {
        return res.sendStatus(HttpStatus.FORBIDDEN);
    }
    req.token = token;
    next();
}

function test(){
    console.log("hello from middleware test");
}

// explicitly export every function
module.exports = {
    verifyToken : verifyToken,
    verifyTokenInCookie : verifyTokenInCookie,
    test : test
};