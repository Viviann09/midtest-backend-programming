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

  // Get user detail
  route.get('/:id', authenticationMiddleware, accountsControllers.getAccount);

  // Update user
  route.put(
    '/:id',
    digitalBankingMiddleware,
    celebrate(accountsValidator.updateUser),
    accountsControllers.updateAccount
  );

  //changepassword
  route.patch(
    '/:id/changePassword',
    digitalBankingMiddleware,
    celebrate(accountsValidator.changePassword),
    accountsControllers.changePassword
  );

  // Delete user
  route.delete(
    '/:id',
    digitalBankingMiddleware,
    accountsControllers.deleteAccount
  );
};
