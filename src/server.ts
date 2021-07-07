const App = require('./app');
const config = require('./config/config');
const AuthRoutes = require('./api/components/auth/auth.routes');
const TrelloRoutes = require('./api/components/trello/trello.routes');


const app = new App([
    AuthRoutes,
    TrelloRoutes
], config);

app.listen();
