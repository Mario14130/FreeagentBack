import { Router } from "express";

export default interface IRoutes {
    router: Router;
    path: string;
    initializeRoutes(): void;
}