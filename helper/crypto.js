'use strict';
var crypto = require('crypto');


/**
 * Generates random string of characters
 * @function
 * @param {number} length - Length of the random string.
 */
var generateRandomString = function(length){
    return crypto.randomBytes(Math.ceil(length/2))
            .toString('hex')
            .slice(0,length);
}

/**
 * hash password with sha512.
 * @function
 * @param {string} password - List of required fields.
 * @param {string} salt - Data to be validated.
 */
var sha512withSalt = function(password ,salt){
    var hash = crypto.createHmac('sha512',salt);
    hash.update(password);
    var value = hash.digest('hex');
    return {
        salt:salt,
        passwordHash : value
    }
}


var saltHashPassword = function(password) {
    var salt = generateRandomString(16); /** Gives us salt of length 16 */
    var passwordData = sha512withSalt(password, salt);
    return {
        password : passwordData.passwordHash,
        salt: passwordData.salt
    };
}


module.exports = {
    saltHashPassword,
}