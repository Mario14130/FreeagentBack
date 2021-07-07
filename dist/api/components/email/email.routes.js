"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routes_class_1 = require("./../routes/routes.class");
const Controller = require('./email.controller');
class EmailRoutes extends routes_class_1.default {
    constructor(base_path) {
        super(base_path);
    }
    initializeRoutes() {
        this.createRoute('post', '/send', Controller.sendEmail());
    }
}
const emailRoutes = new EmailRoutes('/email');
module.exports = emailRoutes.router;
