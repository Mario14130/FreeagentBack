"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routes_class_1 = require("./../routes/routes.class");
const Controller = require('./trello.controller');
class TrelloRoutes extends routes_class_1.default {
    constructor(base_path) {
        super(base_path);
    }
    initializeRoutes() {
        this.createRoute('get', '*', Controller.proxy());
        this.createRoute('post', '*', Controller.proxy());
        this.createRoute('put', '*', Controller.proxy());
        this.createRoute('delete', '*', Controller.proxy());
    }
}
const trelloRoutes = new TrelloRoutes('/trello');
module.exports = trelloRoutes.router;
