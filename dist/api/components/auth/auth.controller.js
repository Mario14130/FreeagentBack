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
const axios = require('axios');
const Responses = require('./../../network/responses');
const OAuth = require('oauth').OAuth;
const url = require('url');
const config = require('./../../../config/config');
const fs = require('fs/promises');
class AuthController {
    constructor() {
        this.requestURL = `https://trello.com/1/OAuthGetRequestToken`;
        this.accessURL = `https://trello.com/1/OAuthGetAccessToken`;
        this.authorizeURL = `https://trello.com/1/OAuthAuthorizeToken`;
        this.appName = 'Freeagent Challenge';
        this.scope = 'read,write,account';
        this.expiration = '1day';
        this.callbackUrl = `http://localhost:3000/api/auth/callback`;
        this.oauth = new OAuth(this.requestURL, this.accessURL, config.trello.api_key, config.trello.secret, '1.0', this.callbackUrl, 'HMAC-SHA1');
        this.oauth_secrets = {};
    }
    login() {
        return (req, res) => {
            try {
                this.oauth.getOAuthRequestToken((error, token, tokenSecret, results) => {
                    if (!error) {
                        this.oauth_secrets[token] = tokenSecret;
                        return Responses.success(req, res, `${this.authorizeURL}?oauth_token=${token}&name=${this.appName}&expiration=${this.expiration}&scope=${this.scope}`, 200);
                    }
                    Responses.error(req, res, error, 400);
                });
            }
            catch (error) {
                Responses.error(req, res, error, 400);
            }
        };
    }
    callback() {
        return (req, res) => {
            console.log('CALLBACK CALLED');
            const query = url.parse(req.url, true).query;
            const token = query.oauth_token;
            const tokenSecret = this.oauth_secrets[token];
            const verifier = query.oauth_verifier;
            this.oauth.getOAuthAccessToken(token, tokenSecret, verifier, (error, accessToken, accessTokenSecret, results) => __awaiter(this, void 0, void 0, function* () {
                if (error) {
                    return Responses.error(req, res, error, 401);
                }
                try {
                    const { data: userInfo } = yield axios.get(`https://api.trello.com/1/members/me?key=${config.trello.api_key}&token=${accessToken}`);
                    res.writeHead(302, { 'Location': url.format({
                            pathname: `http://localhost:3001/user/${userInfo.username}/${accessToken}`,
                            query: {
                                organizations: JSON.stringify(userInfo.idOrganizations)
                            }
                        }) });
                    res.end();
                }
                catch (error) {
                    console.log(error);
                    res.writeHead(302, {
                        'Location': `http://localhost:3001/`
                    });
                    res.end();
                }
            }));
        };
    }
    ;
}
const Controller = new AuthController();
module.exports = Controller;
