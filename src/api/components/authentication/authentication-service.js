const authenticationRepository = require('./authentication-repository');
const { generateToken } = require('../../../utils/session-token');
const { passwordMatched } = require('../../../utils/password');

/**
 * Check username and password for login.
 * @param {string} email - Email
 * @param {string} password - Password
 * @returns {object} An object containing, among others, the JWT token if the email and password are matched. Otherwise returns null.
 */
async function checkLoginCredentials(email, password) {
  const user = await authenticationRepository.getUserByEmail(email);

  // We define default user password here as '<RANDOM_PASSWORD_FILTER>'
  // to handle the case when the user login is invalid. We still want to
  // check the password anyway, so that it prevents the attacker in
  // guessing login credentials by looking at the processing time.
  const userPassword = user ? user.password : '<RANDOM_PASSWORD_FILLER>';
  const passwordChecked = await passwordMatched(password, userPassword);

  // Because we always check the password (see above comment), we define the
  // login attempt as successful when the `user` is found (by email) and
  // the password matches.
  if (user && passwordChecked) {
    const currentTime = new Date().toLocaleString();
    return {
      email: user.email,
      name: user.name,
      user_id: user.id,
      token: generateToken(user.email, user.id),
      message: `succesfull login at : ${currentTime}`,
    };
  }

  return null;
}

/**
 * Create new attempt
 * @param {string} email - Email
 * @param {number} attempt - Attempt
 * @returns {boolean}
 */
async function createAttempt(email, attempt) {
  try {
    await authenticationRepository.createAttempt(email, attempt);
  } catch (err) {
    return null;
  }

  return true;
}

/**
 * Get attempt detail
 * @param {string} email - Email
 * @returns {Object}
 */
async function getAttempt(email) {
  const get_attempt = await authenticationRepository.getAttempt(email);
  if (!get_attempt) {
    return null;
  }
  return get_attempt.attempt;
}

/**
 * Update existing attempt
 * @param {string} email - Email
 * @param {number} attempt - Attempt
 * @returns {boolean}
 */
async function updateAttempt(email, attempt) {
  try {
    await authenticationRepository.updateAttempt(email, attempt);
  } catch (err) {
    return null;
  }

  return true;
}

/**
 * Delete Attempt
 * @param {string} email - Email
 * @returns {boolean}
 */
async function deleteAttempt(email) {
  try {
    await authenticationRepository.deleteAttempt(email);
  } catch (err) {
    return null;
  }

  return true;
}

/**
 * Create new time
 * @param {string} email - Email
 * @param {time} time - Time
 * @returns {boolean}
 */
async function createTime(email, time) {
  try {
    await authenticationRepository.createTime(email, time);
  } catch (err) {
    return null;
  }

  return true;
}

/**
 * Get time detail
 * @param {string} email - Email
 * @returns {Object}
 */
async function getTimeout(email) {
  const get_time = await authenticationRepository.getTimeout(email);
  if (!get_time) {
    return null;
  }
  return get_time.time;
}

/**
 * Delete time
 * @param {string} email - Email
 * @returns {boolean}
 */
async function deleteTime(email) {
  try {
    await authenticationRepository.deleteTime(email);
  } catch (err) {
    return null;
  }

  return true;
}

module.exports = {
  checkLoginCredentials,
  createAttempt,
  getAttempt,
  updateAttempt,
  deleteAttempt,
  createTime,
  getTimeout,
  deleteTime,
};
