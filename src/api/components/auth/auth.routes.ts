import Routes from './../routes/routes.class';
const Controller = require('./auth.controller');

class AuthRoutes extends Routes {

    constructor(base_path) {
        super(base_path);
    }

    initializeRoutes(): void {
        this.createRoute('get', '/login', Controller.login());
        this.createRoute('get', '/callback', Controller.callback());
    }

}

const authRoutes = new AuthRoutes('/auth');

module.exports = authRoutes.router;