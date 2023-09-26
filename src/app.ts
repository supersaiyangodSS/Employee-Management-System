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
import { randomBytes } from 'crypto';
import session from 'express-session';
import { ResultWithContextImpl } from 'express-validator/src/chain/context-runner-impl.js';
connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app : Express = express();
const viewsPath = join(__dirname, "../views");
const layoutPath = join(__dirname, '../views/layout');
const partialsPath = join(__dirname, "../views/partials");
const secretString = randomBytes(32).toString('hex');
const secret = process.env.SECRET || secretString;

const hbs = create({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: layoutPath,
    partialsDir: partialsPath,
});
app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs');

app.use(
    session({
        secret: secret,
        resave: false,
        saveUninitialized: true,
    })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.set('views', viewsPath);
app.use('/sign-in', loginRouter);
app.use('/sign-up', registerRouter);

app.use(( req : Request , res : Response , next : NextFunction) => {
    logger.info(`Request received ${req.method} ${req.url}`);
    console.log(`Request received ${req.method} ${req.url}`);
    next();
});

const checkAuth = (req: Request, res: Response, next: NextFunction) => {
    if (req.session && req.session.user) {
        next();
    }
    else {
        res.redirect('/')
    }
}

app.get("/", ( req : Request, res : Response ) => {
    res.render('home', {
        title: "homepage"
    });
});

export default app;
