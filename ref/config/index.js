const curEnv = process.env.NODE_ENV || 'default';
const configFileName = './' + curEnv + '.json';
module.exports = require(configFileName);