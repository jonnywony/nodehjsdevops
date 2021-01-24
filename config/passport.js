import passport from 'passport';
import { Strategy } from 'passport-local';
import User from '../models/Users';


export function init(){

    passport.serializeUser(function(user,done){
        done(null,user);
    })

    passport.deserializeUser(function(user,done){
        done(null,user);
    })


    passport.use(new Strategy((username,password,done)=>{
        User.findOne({username:username})
            .exec((err,user)=>{
                if(err){return done(err);}
                if(!user){return done(null,false)}
                if(user.authenticate(password,user.salt)!=user.hashed_password){return done(null,false)}

                done(null,user.reshapeJSON(user));
            })
    }))

}