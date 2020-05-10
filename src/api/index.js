const Router = require('express').Router;

const upload = require('./routes/upload');
const auth = require('./routes/auth');

module.exports = () => {
  const app = Router();

  upload(app);

  auth(app);
  
  return app
}