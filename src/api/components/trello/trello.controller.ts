import Controller from './../../interfaces/controller.interface';
import { NextFunction, Request, Response } from 'express';
const EmailController = require('./../email/email.controller');
const axios = require('axios');
const Responses = require('./../../network/responses');
const config = require('./../../../config/config');
const url = require('url');

class TrelloController implements Controller {


    proxy() {
        return async (req: Request, res: Response, next: NextFunction) => {
            const method = req.method.toLowerCase();
            const oauth_token = req.headers.authorization;

            if (!oauth_token) {
                return Responses.error(req, res, { error: 'Not Authorized' }, 401);
            }
            const objectUrl = url.parse(req.url, true);
    
            const query = objectUrl.query;

            const uri = objectUrl.pathname.substr(7);

            const peticion = url.format({
                pathname: `${config.trello.uri}${uri}`,
                query: {
                    key: config.trello.api_key,
                    token: oauth_token,
                    ...query
                }
            });

            try {
                const { data } = await axios[method](peticion);
                if (method === 'delete') {
                    const { username, card } = req.body;
                    console.log(method, username);
                    EmailController.sendEmail(card, username);
                }
                Responses.success(req, res, data, 200);
            } catch (error) {
                console.log(error);
                Responses.error(req, res, error.message, 400);
            }

        }
    }

}

const Controller = new TrelloController();

module.exports = Controller;