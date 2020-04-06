const express = require('express');
const router = express.Router();
const HttpStatus = require('http-status-codes');
const bcrypt = require('bcrypt');


// move the salt to a config file or something or just generate it 
const salt = "RaNdOm_sAlT_123";

// tst route
router.get('/', (req, res) => {
    
    const members = [
        {
            id: 1,
            firstName: "first name",
            lastName: "last name",
            email: "email@email.com"
        }
    ];

    res.json(members); 
})

router.post('/register', (req, res) => {
    var newUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,    
        username: req.body.newUsername,
        email: req.body.email,
        password: req.body.newPassword
    };

    console.log(newUser.username);
    console.log(newUser.password);
    if (!(newUser.username && newUser.password)) { 
        return res.status(HttpStatus.BAD_REQUEST).json({
            errorMsg: "username and/or password cannot be blank, please try again"
        });
    }

    //mock, check to see if user is already in database
    if (newUser.username === 'test') {
        return res.status(HttpStatus.BAD_REQUEST).json({
            errorMsg: "username already exists, please use a new username"
        });
    }

    // add salt ot increase the entropy
    var salt = bcrypt.genSalt(8);
    newUser.password = bcrypt.hashSync(newUser.password, 8);

    // store new userinto database
    // service.dbMapper.save(newUser);

    // console.log(newUser.password);

    res.status(HttpStatus.OK).json(newUser);
})




module.exports = router;