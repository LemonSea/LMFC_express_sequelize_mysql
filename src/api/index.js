const Router = require('express').Router;

const authCtrl = require('./routes/authCtrl');
const roleCtrl = require('./routes/roleCtrl');
const adminCtrl = require('./routes/adminCtrl');

module.exports = () => {
  const app = Router();

  authCtrl(app);
  roleCtrl(app);
  adminCtrl(app);
    
  return app
}