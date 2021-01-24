'use strict'
const jwt = require('jsonwebtoken');
const config = require('nconf');
const jwt_secret = config.get("JWT_SECRET")


/**
 * Generate JWT Token
 * @function
 * @param {Object} payload
 * @param {Object} $Options
 */
var sign = function(payload , $Options){

    var signOptions = {
        issuer: $Options.issuer,
        subject: $Options.subject,
        audience: $Options.audience,
        expiresIn: $Options.expiresIn,
    }

    return jwt.sign(payload,jwt_secret,signOptions)
}

var verify = function(token){
    return new Promise((resolve,reject)=>{
        resolve(jwt.verify(token,jwt_secret));
    })
} 

var decode = function(token){
    return jwt.decode(token,{complete:true});
}

module.exports = {
    sign,
    verify,
    decode,
}