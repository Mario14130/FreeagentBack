"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const EmailController = require('./../email/email.controller');
const axios = require('axios');
const Responses = require('./../../network/responses');
const config = require('./../../../config/config');
const url = require('url');
class TrelloController {
    proxy() {
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
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
                query: Object.assign({ key: config.trello.api_key, token: oauth_token }, query)
            });
            try {
                const { data } = yield axios[method](peticion);
                if (method === 'delete') {
                    const { username, card } = req.body;
                    console.log(method, username);
                    EmailController.sendEmail(card, username);
                }
                Responses.success(req, res, data, 200);
            }
            catch (error) {
                console.log(error);
                Responses.error(req, res, error.message, 400);
            }
        });
    }
}
const Controller = new TrelloController();
module.exports = Controller;
