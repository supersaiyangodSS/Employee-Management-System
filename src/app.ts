import dotenv from 'dotenv';
dotenv.config();
import express, { Express, Request, Response, NextFunction } from 'express';
import connectDB from './config/database.js';
import loginRouter from './routes/loginRouter.js';
import registerRouter from './routes/registerRouter.js';
import logger from './logger.js';
import { create } from 'express-handlebars';
import { join , dirname } from 'path';
import { fileURLToPath } from 'url';
connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app : Express = express();
const viewsPath = join(__dirname, "../views");
const layoutPath = join(__dirname, '../views/layout');
const partialsPath = join(__dirname, "../views/partials");

const hbs = create({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: layoutPath,
    partialsDir: partialsPath,
})
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');


app.set('views', viewsPath);
app.use('/sign-in', loginRouter);
app.use('/sign-up', registerRouter);

app.use(( req : Request , res : Response , next : NextFunction) => {
    logger.info(`Request received ${req.method} ${req.url}`);
    console.log(`Request received ${req.method} ${req.url}`);
    next();
})

app.get("/", ( req : Request, res : Response ) => {
    res.render('home', {
        title: "homepage"
    })
});

export default app;