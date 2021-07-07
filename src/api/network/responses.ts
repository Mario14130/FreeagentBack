import express = require('express');

class Responses {

    static success (_req: express.Request, res: express.Response, message: any = '', statusCode: number = 200) {
        res.status(statusCode).send({
            status: statusCode,
            error: false,
            body: message,
        });
    }

    static error (_req: express.Request, res: express.Response, message: any = 'Internal Server Error', statusCode: number = 500) {
        res.status(statusCode).send({
            status: statusCode,
            error: true,
            body: message,
        });
    }
}

module.exports = Responses;