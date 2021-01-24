var winston = require('winston');

var logger = new winston.createLogger({
    transports: [
    new winston.transports.File({
      level: 'info',
      filename: './logs/all-logs.log',
      handleExceptions: true,
      json: true,
      maxsize: 5242880, //5MB
      maxFiles: 5
    })
  ],
  exitOnError: false
})

const loggerstream = {
  write: function (message, encoding) {
    logger.info(message);
  }
};

module.exports = loggerstream;

