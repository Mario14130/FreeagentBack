import IRoutes from '../../interfaces/routes.interface';
import { Router } from 'express';
const express = require('express');

export default abstract class Routes implements IRoutes {

    path: string;
    router: Router;
    initializeRoutes(){};

    constructor(path: string) {
        this.path = path;
        this.router = express.Router();
        this.initializeRoutes();
    }

    createRoute(method: 'get' | 'post' | 'put' | 'delete', path: string, callback) {
        this.router[method](`${this.path}${path}`, callback);
    };

}