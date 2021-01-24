var config = require('nconf');
var mongoose = require('mongoose');


// Retry connection
const connectWithRetry = () => {
    console.log('MongoDB connection with retry')
    return mongoose.connect(config.get('MONGODB_URL')/*,{useMongoClient:true}*/)
  }

module.exports = connectWithRetry;