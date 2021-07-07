"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const cors = require("cors");
class App {
    constructor(routers, config) {
        this.app = express();
        this.port = config.server.port;
        this.base_url = config.server.base_url;
        this.initializeMiddlewares();
        this.initializeRouter(routers);
    }
    initializeRouter(routers) {
        routers.forEach(router => {
            this.app.use(this.base_url, router);
        });
        // error handler
        // this.app.use(errors);
    }
    initializeMiddlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(`${this.base_url}`, express.static('public'));
        this.app.get('/', function (req, res) {
            res.send('API');
        });
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`[ SERVER LISTENING AT ${this.port}]`);
        });
    }
}
module.exports = App;
