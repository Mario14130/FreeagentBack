"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routes_class_1 = require("./../routes/routes.class");
const Controller = require('./auth.controller');
class AuthRoutes extends routes_class_1.default {
    constructor(base_path) {
        super(base_path);
    }
    initializeRoutes() {
        this.createRoute('get', '/login', Controller.login());
        this.createRoute('get', '/callback', Controller.callback());
    }
}
const authRoutes = new AuthRoutes('/auth');
module.exports = authRoutes.router;
