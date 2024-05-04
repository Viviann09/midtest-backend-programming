const { User, Authenticationtime } = require('../../../models');
const { Authentication } = require('../../../models');

/**
 * Get user by email for login information
 * @param {string} email - Email
 * @returns {Promise}
 */
async function getUserByEmail(email) {
  return User.findOne({ email });
}

/**
 * Get attempt detail
 * @param {string} email - Email
 * @returns {Promise}
 */
async function getAttempt(email) {
  return Authentication.findOne({ email });
}

/**
 * Create new attempt
 * @param {string} email - Email
 * @param {number} attempt - Attempt
 * @returns {Promise}
 */
async function createAttempt(email, attempt) {
  return Authentication.create({
    email,
    attempt,
  });
}

/**
 * Update existing attempt
 * @param {string} email - Email
 * @param {number} attempt - Attempt
 * @returns {Promise}
 */
async function updateAttempt(email, attempt) {
  return Authentication.updateOne(
    {
      email: email,
    },
    {
      $set: {
        attempt,
      },
    }
  );
}

/**
 * Delete attempt
 * @param {string} email - Email
 * @returns {Promise}
 */
async function deleteAttempt(email) {
  return Authentication.deleteOne({ email: email });
}

/**
 * Create new time
 * @param {string} email - Email
 * @param {time} time
 * @returns {Promise}
 */
async function createTime(email, time) {
  return Authenticationtime.create({
    email,
    time,
  });
}

/**
 * Get time detail
 * @param {string} email - Email
 * @returns {Promise}
 */
async function getTimeout(email) {
  return Authenticationtime.findOne({ email });
}

/**
 * Delete time
 * @param {string} email - Email
 * @returns {Promise}
 */
async function deleteTime(email) {
  return Authenticationtime.deleteOne({ email: email });
}

module.exports = {
  getUserByEmail,
  getAttempt,
  createAttempt,
  updateAttempt,
  deleteAttempt,
  createTime,
  getTimeout,
  deleteTime,
};
