const unless = require('express-unless');
const JwtHelper = require('../helper/JwtHelper');
const moment = require('moment');

module.exports = function JwtHandler(options){
    
    if(!options || !options.secret){
        throw new Error('Secret should be set');
    }

    var middleware = function(req,res,next){
        const token = req.body.token || null;

        if(token == null){
            next(res.status(404).send("No Token was found"));
        }
        
        if(token){
            JwtHelper.verify(token).then(result=>{
                console.log("Token expires in : " + moment.unix(result.exp).format("DD-MM-YYYY HH:mm:ss"))
                next();
            }).catch(err=>{
                next(res.status(401).send(err))
            })
        }
    }

    middleware.unless = unless;
    return middleware;
}