const express = require('express');
const config = require('./config');

const loaders = require('./loaders');
const logger = require('./middlewares/logger');


const app = express();

loaders(app);

// console.dir(process.env.NODE_ENV)

const port = (process.env.NODE_ENV === 'test') ? 7000 : config.port || 3000
const server = app.listen(port, (err) => {
  if (err) {
    // console.dir(`err`);
    logger.error(err);
    process.exit(1);
  }
  logger.info(`Server listening on port: ${port}`);
  // throw new Error('Something failed during startup.')
  // console.dir(`Server listen on port ${port}`);
});

module.exports = server
