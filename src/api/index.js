const Router = require('express').Router;

const upload = require('./routes/upload');
const auth = require('./routes/auth');

const user = require('./routes/user');
const userInfo = require('./routes/userInfo');
const role = require('./routes/role');

const companyCtrl = require('./routes/companyCtrl');
const phone = require('./routes/phone');


module.exports = () => {
  const app = Router();

  upload(app);

  auth(app);
  user(app);
  userInfo(app);
  role(app);
  
  companyCtrl(app);
  phone(app);
  
  return app
}