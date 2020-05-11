const Router = require('express').Router;

const authCtrl = require('./routes/authCtrl');
const roleCtrl = require('./routes/roleCtrl');
const adminCtrl = require('./routes/adminCtrl');
const vcardCtrl = require('./routes/vcardCtrl');
const userCtrl = require('./routes/userCtrl');

module.exports = () => {
  const app = Router();

  authCtrl(app);
  roleCtrl(app);
  adminCtrl(app);
  vcardCtrl(app);
  userCtrl(app);
    
  return app
}