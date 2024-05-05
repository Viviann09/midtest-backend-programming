const express = require('express');

const authentication = require('./components/authentication/authentication-route');
const digitalBanking = require('./components/digital-banking/authentication-route-digital-banking');
const users = require('./components/users/users-route');
const accounts = require('./components/digital-banking/accounts-route');

module.exports = () => {
  const app = express.Router();

  authentication(app);
  digitalBanking(app);
  users(app);
  accounts(app);
  return app;
};
