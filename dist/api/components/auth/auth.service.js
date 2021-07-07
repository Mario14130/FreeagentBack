"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require('jsonwebtoken');
const config = require('./../../../config');
const Responses = require('./../../network/responses');
class AuthService {
    constructor() {
        this.secret = config.jwt.secret;
    }
    authenticated(req) {
        const decoded = this.decodeHeader(req);
    }
    sign(data) {
        return jwt.sign(data, this.secret);
    }
    verify(token) {
        try {
            const decoded = jwt.verify(token, this.secret);
            return decoded;
        }
        catch (error) {
            let err = new Error(error.message);
            err.statusCode = 401;
            throw err;
        }
    }
    decodeHeader(req) {
        const authorization = req.headers.authorization || '';
        const decoded = this.verify(authorization);
        req.user = decoded;
        return decoded;
    }
}
const authService = new AuthService();
module.exports = authService;
