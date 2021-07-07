"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Responses {
    static success(_req, res, message = '', statusCode = 200) {
        res.status(statusCode).send({
            status: statusCode,
            error: false,
            body: message,
        });
    }
    static error(_req, res, message = 'Internal Server Error', statusCode = 500) {
        res.status(statusCode).send({
            status: statusCode,
            error: true,
            body: message,
        });
    }
}
module.exports = Responses;
