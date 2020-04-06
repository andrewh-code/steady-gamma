'use strict';
const Response = require('./Response');

class SuccessResponse extends Response {

    constructor(status, message){
        super(status, message);
    }

    get details(){
        return this._details;
    }

    set details(details){
        this._details = details;
    }
}

module.exports = SuccessResponse;