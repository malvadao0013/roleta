import express, { ErrorRequestHandler, Request, Response, NextFunction } from 'express';
import mustache from 'mustache-express';
import dotenv from 'dotenv';
import path from 'path';
import passport from 'passport';
import flash from 'express-flash';
import session from 'express-session';
import cookieParser from 'cookie-parser';


import router from './routes/router';


import http from 'http';
import socketIo, { Server, Socket } from 'socket.io';
import { configureSocket } from './sockets/socket';


dotenv.config();




interface CustomSocket extends Socket {
    user?: any; // Substitua "any" pelo tipo adequado do usuário
  }

const app = express();

const server = http.createServer(app);
const io = configureSocket(server);
// ENGINE TEMPLATE
app.set('view engine', 'mst');
app.set('views', path.join(__dirname, 'views'));
app.engine('mst', mustache(__dirname+'/views/partials', '.mst'));

// STATIC PUBLIC
app.use(express.static(path.join(__dirname, '../public')));

// PASSPORT
const sessionMiddleware = session({
    secret:'1234567',
    resave:true,
    saveUninitialized:true
})
app.use(sessionMiddleware)
app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use(express.json());
app.use(express.urlencoded({extended:true}));


// VARIABLES GLOBAL
app.use(async(req: Request, res: Response, next: NextFunction)=>{
    res.locals.flashers = req.flash();
    res.locals.user = req.user;
    next();
})

// ROUTER


app.use(router);




app.use((req, res)=>{
    res.redirect('/')
});

const errorHandler: ErrorRequestHandler = (err, req, res, next)=>{
    if(err.status){
        res.status(err.status);
    }else{
        res.status(400);
    }
    if(err.errorMessage){
        res.json(err);''
    }else{
        res.json({status: 400, error: true, errorMessage: 'Ocorreu algum erro.'});
    }
}

app.use(errorHandler);

// START
server.listen(80);