"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
class Routes {
    constructor(path) {
        this.path = path;
        this.router = express.Router();
        this.initializeRoutes();
    }
    initializeRoutes() { }
    ;
    createRoute(method, path, callback) {
        this.router[method](`${this.path}${path}`, callback);
    }
    ;
}
exports.default = Routes;
