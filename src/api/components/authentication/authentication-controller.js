const { errorResponder, errorTypes } = require('../../../core/errors');
const authenticationServices = require('./authentication-service');

/**
 * Handle login request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
const login_attempts_limit = {};
async function login(request, response, next) {
  const { email, password } = request.body;
  try {
    const current_time = new Date().getTime();
    const current_time_ = new Date().toLocaleString();

    if (
      login_attempts_limit[email] &&
      login_attempts_limit[email].attempts_ >= 5
    ) {
      let attempts_limit = login_attempts_limit[email].last_attempt.getTime();
      attempts_limit = attempts_limit + 1 * 60 * 1000;
      if (attempts_limit > current_time) {
        throw errorResponder(
          errorTypes.FORBIDDEN,
          `Too many failed login attempts at ${current_time_}. wait 30 minutes to login again`
        );
      } else {
        login_attempts_limit[email] = {
          attempts_: 0,
          last_attempt: new Date(),
        };
      }
    }

    // Check login credentials
    const loginSuccess = await authenticationServices.checkLoginCredentials(
      email,
      password
    );

    if (!loginSuccess) {
      if (!login_attempts_limit[email]) {
        login_attempts_limit[email] = {
          attempts_: 1,
          last_attempt: new Date(),
        };
      } else {
        login_attempts_limit[email].attempts_++;
        login_attempts_limit[email].last_attempt = new Date();
      }
      throw errorResponder(
        errorTypes.INVALID_CREDENTIALS,
        `Wrong email or password. Login attempt = ${login_attempts_limit[email].attempts_}. Login Unsuccess at ${current_time_}. Please fill with the correct email and password.`
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
