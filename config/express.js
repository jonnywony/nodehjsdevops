import express from 'express';
import MainRouter from '../routers';
import bodyParser from 'body-parser';
import JwtHandler from '../middleware/JwtHandler';
import LogHandler from '../middleware/LogHandler';
import config from 'nconf';
import passport from 'passport';
var morgan = require('morgan')
var RateLimit = require('express-rate-limit');
const app = express();

var limiter = new RateLimit({
  windowMs: 15*60*1000, // 15 minutes 
  max: 100, // limit each IP to 100 requests per windowMs 
  delayMs: 0 // disable delaying - full speed until the max limit is reached 
});

// Order must be correct
export function init(sessionMiddleware){

  // NodeJS's Middleware Parser =====================
  // Parse application/json format
  app.use(bodyParser.json({
    limit: '50mb'
  }));
  

  // Parse application/x-www-form-urlencoded format
  app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true
  }));

  // ================================================
  app.enable('trust proxy'); 
  app.use(limiter);

  app.use(passport.initialize())
  app.use(passport.session());

  app.use(JwtHandler({secret:config.get("JWT_SECRET")})
  .unless({
    path:[
      '/api/user/authenticate',
      '/api/user/register'
    ]
  }))

  app.use(sessionMiddleware);
  app.use(morgan('combined', { "stream": LogHandler.loggerstream }));
  app.use(MainRouter);



}


export function getAppInstance (){
    return app;
}