const express = require('express');

const authenticationControllerDigitalBankings = require('./authentication-controller-digital-banking');
const authenticationValidatorDigitalBankings = require('./authentication-validator-digital-banking');
const celebrate = require('../../../../core/celebrate-wrappers');

const route = express.Router();

module.exports = (app) => {
  app.use('/digitalbanking', route);

  route.post(
    '/login',
    celebrate(authenticationValidatorDigitalBankings.login),
    authenticationControllerDigitalBankings.login
  );
};
