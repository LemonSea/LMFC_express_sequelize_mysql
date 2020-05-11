const Router = require('express').Router;

// const upload = require('./routes/upload');
const authCtrl = require('./routes/authCtrl');

// const user = require('./routes/user');
// const userInfo = require('./routes/userInfo');
const roleCtrl = require('./routes/roleCtrl');
const adminCtrl = require('./routes/adminCtrl');

// const companyCtrl = require('./routes/companyCtrl');
// const phone = require('./routes/phone');


module.exports = () => {
  const app = Router();

  // upload(app);

  // auth(app);
  // user(app);
  // userInfo(app);
  authCtrl(app);
  roleCtrl(app);
  adminCtrl(app);
  
  // companyCtrl(app);
  // phone(app);
  
  return app
}