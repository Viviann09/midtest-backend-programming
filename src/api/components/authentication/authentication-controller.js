const { errorResponder, errorTypes } = require('../../../core/errors');
const authenticationServices = require('./authentication-service');

/**
 * Handle login request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */

async function login(request, response, next) {
  const { email, password } = request.body;
  try {
    let login_attempts = await authenticationServices.getAttempt(email);
    if (!login_attempts) {
      login_attempts = 0;
    }

    // jika sudah attempt 5 kali maka akan keblock dan menampilkan error Too many failed login attempts
    // jika login dengan email dan password yang benar dengan attempt < 5 maka akan menampilkan success
    if (login_attempts == 5) {
      const current_time = new Date().getTime();
      const current_time_ = new Date().toLocaleString();
      const attemptsLimit = await authenticationServices.getTimeout(email);
      if (!attemptsLimit) {
        await authenticationServices.createTime(email, current_time_);
        throw errorResponder(
          errorTypes.FORBIDDEN,
          `Too many failed login attempts at ${current_time_}. wait 30 minutes to login again`
        );
      }
      const limit = attemptsLimit.getTime();
      const limit_ = limit + 30 * 60 * 1000;

      if (limit_ > current_time) {
        throw errorResponder(
          errorTypes.FORBIDDEN,
          `Too many failed login attempts at ${current_time_}. wait 30 minutes to login again`
        );
      } else {
        const delete_attempt =
          await authenticationServices.deleteAttempt(email);
        await authenticationServices.deleteTime(email);
        if (delete_attempt == true) {
          login(request, response, next);
        }
      }
    } else if (login_attempts < 5) {
      // Check login credentials
      const loginSuccess = await authenticationServices.checkLoginCredentials(
        email,
        password
      );

      if (!loginSuccess) {
        login_attempts = login_attempts + 1;
        if (login_attempts == 1) {
          await authenticationServices.createAttempt(email, login_attempts);
        } else {
          await authenticationServices.updateAttempt(email, login_attempts);
        }
        const current_time_ = new Date().toLocaleString();

        throw errorResponder(
          errorTypes.INVALID_CREDENTIALS,
          `Wrong email or password. Login attempt = ${login_attempts}. Login Unsuccessful at ${current_time_}. Please fill with the correct email and password.`
        );
      } else {
        await authenticationServices.deleteAttempt(email);
        return response.status(200).json(loginSuccess);
      }
    }
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  login,
};
