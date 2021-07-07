import Routes from './../routes/routes.class';
const Controller = require('./email.controller');

class EmailRoutes extends Routes {

    constructor(base_path) {
        super(base_path);
    }

    initializeRoutes(): void {
        this.createRoute('post', '/send', Controller.sendEmail());
    }

}

const emailRoutes = new EmailRoutes('/email');

module.exports = emailRoutes.router;