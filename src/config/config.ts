const dotenv = require('dotenv');

dotenv.config();

interface ServerConfig {
    domain: string
    port: string | number;
    base_url: string;
}

interface JWTConfig {
    secret: string;
}

interface TrelloConfig {
    uri: string;
    api_key: string;
    secret: string;
}

export interface ProjectEnv {
    server: ServerConfig;
    jwt: JWTConfig;
    trello: TrelloConfig;
}

module.exports = {
    server: {
        port: process.env.SERVER_PORT || 3000,
        domain: process.env.PROJECT_DOMAIN || `localhost`,
        base_url: process.env.BASE_API_URL || '/api'
    },
    jwt : {
        secret: process.env.JWT_SECRET || 'secret'
    },
    trello: {
        uri: process.env.TRELLO_URI || 'https://api.trello.com/1',
        api_key: process.env.API_KEY || '',
        secret: process.env.TRELLO_SECRET || 'secret'
    },
    email: {
        service: process.env.EMAIL_SERVICE,
        auth: {
            user: process.env.EMAIL_USER,
            password: process.env.EMAIL_PASSWORD
        }
    }
};