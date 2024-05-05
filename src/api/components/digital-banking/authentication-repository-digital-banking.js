const { Account } = require('../../../models');

/**
 * Get a list of accounts
 * @returns {Promise}
 */
async function getAccountByEmail(email) {
  return Account.findOne({ email });
}

module.exports = {
  getAccountByEmail,
};
