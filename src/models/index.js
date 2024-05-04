const mongoose = require('mongoose');
const config = require('../core/config');
const logger = require('../core/logger')('app');

const usersSchema = require('./users-schema');
const authenticationsSchema = require('./authentication-schema');
const authenticationtimesSchema = require('./authentication-schema-time');
const accountsSchema = require('./account-schema');

mongoose.connect(`${config.database.connection}/${config.database.name}`, {
  useNewUrlParser: true,
});

const db = mongoose.connection;
db.once('open', () => {
  logger.info('Successfully connected to MongoDB');
});

const User = mongoose.model('users', mongoose.Schema(usersSchema));
const Authentication = mongoose.model(
  'authentications',
  mongoose.Schema(authenticationsSchema)
);
const Authenticationtime = mongoose.model(
  'authenticationtimes',
  mongoose.Schema(authenticationtimesSchema)
);

const Account = mongoose.model('accounts', mongoose.Schema(accountsSchema));

module.exports = {
  mongoose,
  User,
  Authentication,
  Authenticationtime,
  Account,
};
