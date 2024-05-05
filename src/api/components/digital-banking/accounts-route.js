const express = require('express');

const accountsValidator = require('./accounts-validator');
const digitalBankingMiddleware = require('../../middlewares/digital-banking-middleware');
const celebrate = require('../../../core/celebrate-wrappers');
const accountsControllers = require('./accounts-controller');

const route = express.Router();

module.exports = (app) => {
  app.use('/accounts', route);

  // Get list of accounts
  route.get('/', digitalBankingMiddleware, accountsControllers.getAccounts);

  // Create account
  route.post(
    '/',
    digitalBankingMiddleware,
    celebrate(accountsValidator.createAccount),
    accountsControllers.createAccount
  );

  // Get account detail
  route.get('/:id', digitalBankingMiddleware, accountsControllers.getAccount);

  // Update Account
  route.put(
    '/:id',
    digitalBankingMiddleware,
    celebrate(accountsValidator.updateAccount),
    accountsControllers.updateAccount
  );

  //changepassword
  route.patch(
    '/:id/changePassword',
    digitalBankingMiddleware,
    celebrate(accountsValidator.changePassword),
    accountsControllers.changePassword
  );

  // Delete Account
  route.delete(
    '/:id',
    digitalBankingMiddleware,
    accountsControllers.deleteAccount
  );
};
