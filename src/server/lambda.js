const serverless = require('serverless-http');
const app = require('./app');

// Export the app wrapped with serverless-http for AWS Lambda
module.exports.handler = serverless(app);

