import cors from 'cors'
import express, { NextFunction, Request, Response } from "express";
import mongoose from 'mongoose';
import { DB_URI, PORT } from './config';
import router from './router/index.router';

const start = () => {
    const app = express();
    app.use(
        cors({
            origin: "*"
        })
    );
    app.use(express.json({ limit: "50mb" }));
    app.use(express.urlencoded({ extended: true, limit: "500mb" }));

    app.use("/api", router);

    app.use((error: any, req: Request, res: Response, next: NextFunction) => {
        const statusCode = error.httpCode || 500;
        return res.status(statusCode).send({
            success: false,
            message: error.message,
        });
    });

    return app

};

mongoose
    .connect(DB_URI as string)
    .then((res) => {
        start().listen(PORT, () => {
            console.log("Server is running on PORT" + PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })