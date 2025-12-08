require('dotenv').config();
const config = require('./src/utils/config');
console.log('dbUrl:', config.dbUrl);
console.log('port:', config.port);
console.log('env file content:');
console.log(require('fs').readFileSync('.env', 'utf8'));
