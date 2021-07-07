const jwt = require('jsonwebtoken');
const config = require('./../../../config');
const Responses = require('./../../network/responses');
import { Request } from 'express';
import { Auth, TokenPayload } from './auth.model';

class AuthService {

    private secret: string;

    constructor() {
        this.secret = config.jwt.secret;
    }

    authenticated(req: Request) {
        const decoded = this.decodeHeader(req);
    }

    sign(data: TokenPayload){
        return jwt.sign(data, this.secret);
    }

    verify(token: string): string | any {
        try {
            const decoded = jwt.verify(token, this.secret);
            return decoded;
        }catch(error) {
            let err: any = new Error(error.message);
            err.statusCode = 401;
            throw err;
        }
    }

    decodeHeader(req: any): any {
        const authorization = req.headers.authorization || '';
        const decoded = this.verify(authorization);

        req.user = decoded;

        return decoded;
    }

}

const authService = new AuthService();

module.exports = authService;