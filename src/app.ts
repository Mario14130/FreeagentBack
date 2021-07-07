
import * as e from 'express';
const express = require('express');
import { Router } from 'express';
const cors = require("cors");

class App {

    private app: e.Application;
    private port: string | number;
    private base_url: string;

    constructor(routers: Array<Router>, config: any) {
        this.app = express();
        this.port = config.server.port;
        this.base_url = config.server.base_url;

        this.initializeMiddlewares();
        this.initializeRouter(routers);
    }

    initializeRouter(routers: Array<Router>): void {
        routers.forEach(router => {
            this.app.use(this.base_url, router);
        });
        // error handler
        // this.app.use(errors);
    }

    initializeMiddlewares(): void {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(`${this.base_url}`, express.static('public'));
        this.app.get('/', function (req, res) {
            res.send('API');
        })
    }

    listen(): void {
        this.app.listen(this.port, () => {
            console.log(`[ SERVER LISTENING AT ${this.port}]`);
        });
    }
}

module.exports = App;