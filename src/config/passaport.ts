import passport from "passport";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import jwt from 'jsonwebtoken';
import {Request, Response, NextFunction} from 'express';
import User from "../models/User";




declare module 'express-session' {
    interface SessionData {
        jwt: string;
    }
}




const notAuthorizedJson = {status:401, error:true, errorMessage: 'Não autorizado'};

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: '1234567'
};


passport.use(new JWTStrategy(options, async (payload, done)=>{
    const user = await User.findById(payload.id);

    if(user){
        return done(null, user);
    }else{
        return done(notAuthorizedJson, false);
    }

}));



export const generateToken = (data: object)=>{
    return jwt.sign(data, '1234567', {expiresIn:3600});
}


export const privateRoute = (req:Request, res:Response, next:NextFunction) => {
    
    if(req.cookies['token']){
        req.headers['authorization'] = 'Bearer '+req.cookies['token'];
    }

    passport.authenticate('jwt', (err:any, user:any) => {
        req.user = user;

       
        if(user){

            if(req.cookies['token'] != req.user.token){
                res.redirect('/painel/geral/login')
                return;
            }

            next()

        }else{
            res.redirect('/painel/geral/login')
            return;
        }
    })(req, res, next)
}


export default passport;