const dotenv = require('dotenv');

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// read .dev file
const envFound = dotenv.config();

// console.log(envFound)

if (!envFound) {
  // This error should crash whole process
  throw new Error("Couldn't find .env file");
}

module.exports = {
  /**
   * Your favorite port
   */
  port: parseInt(process.env.PORT, 10),

  // /**
  //  * Local development
  //  * MongoDB connect URL
  //  */
  // databaseURL: process.env.MONGODB_URI,
  // databaseTestURL: process.env.MONGODB_TEST_URI,

  /**
   * mySql db config
   */
  dbConfig: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PAW,
    database: process.env.DB_NAME,
    dialect: process.env.DB_DIALECT,
  },

  /**
   * API configs
   */
  api: {
    prefix: '/api/v1',
  },

  /**
 * Your secret sauce
 */
  jwtSecret: process.env.JWT_SECRET,

  /**
   * Used by winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL || 'silly',
  },
}