const { errorResponder, errorTypes } = require('../../../../core/errors');
const authenticationServiceDigitalBankings = require('./authentication-service-digital-banking');

/**
 * Handle login request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function login(request, response, next) {
  const { account_number, password } = request.body;

  try {
    // Check login credentials
    const loginSuccess =
      await authenticationServiceDigitalBankings.checkLoginCredentials(
        account_number,
        password
      );

    if (!loginSuccess) {
      throw errorResponder(
        errorTypes.INVALID_CREDENTIALS,
        'Wrong account number or password'
      );
    }

    return response.status(200).json(loginSuccess);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  login,
};
