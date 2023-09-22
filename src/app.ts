import dotenv from 'dotenv';
dotenv.config();
import express, { Express, Request, Response } from 'express';
import connectDB from './config/database.js';
connectDB();

const app : Express = express();

app.get("/", ( req : Request, res : Response ) => {
    res.send("HOME");
});

export default app;