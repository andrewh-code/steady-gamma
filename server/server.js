const express = require('express')
const app = express();
const path = require('path');

// properties
var config = require('./z_config/configDev.json');
var configPort = config.port;

// constants
const PORT = process.env.PORT || configPort;

// include the body parser middleawre to allow for parsing raw json
app.use(express.json());
// body parser to parse form input
app.use(express.urlencoded({
    extended: false

}));

// allow for cross origin request
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    
    var allowedHTTPMethods = ["GET", "POST", "UPDATE", "DELETE", "PATCH"];
    res.header("Access-Control-Allow-Methods", allowedHTTPMethods.toString());

    res.header("Access-Control-Allow-Methods", "")
    var allowedHeaders = ["Origin",
                            "X-Requested-With",
                            "Content-Type",
                            "Accept",
                            "Authorization"];

    res.header("Access-Control-Allow-Headers", allowedHeaders.toString());
    next();
});


// put these in their own file
// https://stackoverflow.com/questions/41647112/simple-jwt-auth-using-jquery
// https://steemit.com/utopian-io/@alfarisi94/consuming-jwt-in-client-side-with-jquery
app.use('/', require('./dashboard/home.controller'));
app.use('/users', require('./users/authentication/authentication.controller'));
app.use('/users', require('./users/users.controller'));

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
