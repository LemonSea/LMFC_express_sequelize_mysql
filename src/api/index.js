const Router = require('express').Router;

const upload = require('./routes/upload');
const auth = require('./routes/auth');

const user = require('./routes/user');
const userInfo = require('./routes/userInfo');


module.exports = () => {
  const app = Router();

  upload(app);

  auth(app);
  user(app);
  userInfo(app);
  
  return app
}