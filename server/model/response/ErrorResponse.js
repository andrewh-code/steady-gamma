'use Strict';
const Response = require('./Response');

class ErrorResponse extends Response {

    cosntructor(status, message){
        super(status, message);
    }

    constructor(status, errorId, message, details){
        super(status, message);
        this._errorId = errorId;
        this._details = details;
    }


    get errorId(){
        return this._errorId;
    }

    set errorId(errorId){
        this._errorId = errorId;
    }

    get details(){
        return this._details;
    }

    set details(details){
        this._details = details;
    }
}

module.exports = ErrorResponse;