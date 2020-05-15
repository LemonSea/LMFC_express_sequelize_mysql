const Router = require('express').Router;

const upload = require('./routes/upload');

const siteCtrl = require('./routes/siteCtrl');

const authCtrl = require('./routes/authCtrl');
const roleCtrl = require('./routes/roleCtrl');
const adminCtrl = require('./routes/adminCtrl');

const coachStatusCtrl = require('./routes/coachStatusCtrl');
const coachTypeCtrl = require('./routes/coachTypeCtrl');
const coachCtrl = require('./routes/coachCtrl');

const gymStatusCtrl = require('./routes/gymStatusCtrl');
const gymTypeCtrl = require('./routes/gymTypeCtrl');
// const coachCtrl = require('./routes/coachCtrl');

const vcardCtrl = require('./routes/vcardCtrl');
const userCtrl = require('./routes/userCtrl');

module.exports = () => {
  const app = Router();

  upload(app);

  siteCtrl(app);

  authCtrl(app);
  roleCtrl(app);
  adminCtrl(app);

  gymStatusCtrl(app);
  gymTypeCtrl(app);
  // coachCtrl(app);

  coachStatusCtrl(app);
  coachTypeCtrl(app);
  coachCtrl(app);

  vcardCtrl(app);
  userCtrl(app);
    
  return app
}