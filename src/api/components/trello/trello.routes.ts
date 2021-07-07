import Routes from './../routes/routes.class';
const Controller = require('./trello.controller');

class TrelloRoutes extends Routes {

    constructor(base_path) {
        super(base_path);
    }

    initializeRoutes(): void {
        this.createRoute('get', '*', Controller.proxy());
        this.createRoute('post', '*', Controller.proxy());
        this.createRoute('put', '*', Controller.proxy());
        this.createRoute('delete', '*', Controller.proxy());
    }

}

const trelloRoutes = new TrelloRoutes('/trello');

module.exports = trelloRoutes.router;