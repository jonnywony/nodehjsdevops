require('babel-register');
require('babel-polyfill');
require('./config/env').init();
var session = require('express-session');
var connectMongo = require('connect-mongo');
var mongoose = require('mongoose');
var session = require('express-session');
const config = require('nconf');
const retryMongoDB = require('./middleware/MongoDBHandler');

const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    authSource: 'admin',
    user:config.get('MONGODB_USER'),
    pass:config.get('MONGODB_PASSWORD')
}


// Configure and Connect Mongoose 
mongoose.Promise = require('bluebird');
mongoose.connect(config.get('MONGODB_URL'), dbOptions).then(() => {
    console.log("Connected! url= " + config.get('MONGODB_URL'));
}).catch((err) => {
    console.log(err)
})


// If there is an error, it will exit
// mongodb needs time to connect, so set retry time to 5s
mongoose.connection.on('error', err => {
    console.log(`MongoDB Connection Error: ${err}`)
    setTimeout(retryMongoDB(), 5000);
});



const MongoStores = connectMongo(session);
const sessionMiddleware = session({
    resave: true,
    saveUninitialized:true,
    secret: config.get("SESSION_SECRET"),
    store: new MongoStores({
        mongooseConnection: mongoose.connection
    })
})

require('./config/passport').init();


require('./config/express').init(sessionMiddleware);
var app = require('./config/express').getAppInstance();


console.log("starting point");

const PORT = config.get("PORT");
const HOST = config.get("HOST");

var server = app.listen(PORT/*,HOST*/);
//console.log(`Express server listening on http://${HOST}:${PORT}`);
console.log(`Express server listening on PORT:${PORT}`);


console.log("Seeding Database");
require('./seed/users').init();

module.exports = server;
