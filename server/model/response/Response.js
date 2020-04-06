'use strict';

class Response {

    constructor(){}

    get status() {
        return this._status;
    }

    set status(status) {
        this._status = status;
    }
}

module.exports = Response;