import mongoose from 'mongoose';
var Schema = mongoose.Schema;
import uniqueValidator from 'mongoose-unique-validator';
import crypto from 'crypto';
import validator from 'validator'

var UserSchema = new Schema({
    _id: {
        type:mongoose.Schema.Types.ObjectId,
        auto:true,
    },
    username: {
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        validate:{
            validator:validator.isEmail,
            message: '{VALUE} is not a valid email',
            isAsync:false
        }
    },
    date_created: Date,
    first_name: String,
    last_name: String,
    hashed_password: String,
    isActive: {
        type: Boolean,
        default: true,
    },
    salt: String,
    roles: String
}, {
    timestamps: true
});


UserSchema.methods = {

    /**
     * Authenticate - check if the passwords are the same
     * @param {String} plainText
     * @return {Boolean}
     * @api public
     */
    authenticate:function(plainText,salt){
        return this.sha512withSalt(plainText,salt).passwordHash
    },

    /**
     * Make salt
     * @return {String}
     * @api public
     */
    makeSalt: function(){
        return crypto.randomBytes(Math.ceil(16/2))
               .toString('hex')
               .slice(0,16);
    },

    /**
     * hash password with sha512
     * @param {String} password
     * @param {String} salt
     */
    sha512withSalt:function(password,salt){
        var hash = crypto.createHmac('sha512',salt);
        hash.update(password);
        var value = hash.digest('hex');
        return {
            salt:salt,
            passwordHash:value
        }
    },

    reshapeJSON: function(userJsonObject){
        var obj = userJsonObject.toJSON();
        delete obj.salt;
        delete obj._id;
        delete obj.isActive;
        delete obj.date_created;
        delete obj.hashed_password;
        delete obj.__v;
        delete obj.createdAt;
        delete obj.updatedAt;

        return obj;
    }
}


module.exports = mongoose.model('User', UserSchema);