import Controller from './../../interfaces/controller.interface';
import { Request, Response } from 'express';
const axios = require('axios');
const Responses = require('./../../network/responses');
const OAuth = require('oauth').OAuth;
const url = require('url');
const config = require('./../../../config/config');
const fs = require('fs/promises');

class AuthController implements Controller {

    public requestURL = `https://trello.com/1/OAuthGetRequestToken`;
    public accessURL = `https://trello.com/1/OAuthGetAccessToken`;
    public authorizeURL = `https://trello.com/1/OAuthAuthorizeToken`;
    public appName = 'Freeagent Challenge';
    public scope = 'read,write,account';
    public expiration = '1day';
    public callbackUrl = `http://localhost:3000/api/auth/callback`;
    public oauth = new OAuth(this.requestURL, this.accessURL, config.trello.api_key, config.trello.secret, '1.0', this.callbackUrl, 'HMAC-SHA1');
    public oauth_secrets = {};

    constructor() { }

    login() {
        return (req: Request, res: Response) => {
            try {
                this.oauth.getOAuthRequestToken((error, token, tokenSecret, results) => {
                    if (!error) {
                        this.oauth_secrets[token] = tokenSecret;
                        return Responses.success(req, res, `${this.authorizeURL}?oauth_token=${token}&name=${this.appName}&expiration=${this.expiration}&scope=${this.scope}`, 200);
                    }
                    Responses.error(req, res, error, 400);
                });
            } catch (error) {
                Responses.error(req, res, error, 400);
            }
        }
    }

    callback() {
        return (req: Request, res: Response) => {
            console.log('CALLBACK CALLED');
            const query = url.parse(req.url, true).query;
            const token = query.oauth_token;
            const tokenSecret = this.oauth_secrets[token];
            const verifier = query.oauth_verifier;
            this.oauth.getOAuthAccessToken(token, tokenSecret, verifier, async (error, accessToken, accessTokenSecret, results) => {
                if (error) {
                    return Responses.error(req, res, error, 401);
                }
                try {
                    const { data: userInfo } = await axios.get(`https://api.trello.com/1/members/me?key=${config.trello.api_key}&token=${accessToken}`);
                    res.writeHead(302, { 'Location': url.format({
                        pathname: `http://localhost:3001/user/${userInfo.username}/${accessToken}`,
                        query: {
                            organizations: JSON.stringify(userInfo.idOrganizations)
                        }
                    })});
                    res.end();
                } catch (error) {
                    console.log(error);
                    res.writeHead(302, {
                        'Location': `http://localhost:3001/`
                    });
                    res.end();
                }
                
            });
        }
    };

}

const Controller = new AuthController();

module.exports = Controller;