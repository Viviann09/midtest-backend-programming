const { Account, authenticationDigitalBanking } = require('../../../../models');
const { Account } = require('../../../../models');
const { account_number } = require('../../../../models/account-schema');

/**
 * Get a list of accounts
 * @returns {Promise}
 */
async function getAccounts() {
  return Account.find({});
}

/**
 * Get account detail
 * @param {string} account_number - account number
 * @param {string} account_balance - account balance
 * @returns {Promise}
 */
async function getAccount(account_number, account_balance) {
  return Account.findByaccount_number(account_number, account_balance);
}

/**
 * Create new account
 * @param {string} name - Name
 * @param {string} phone_number - phone number
 * @param {string} nik - Nik
 * @param {string} access_code - Access code
 * @param {string} password - Password
 * @returns {Promise}
 */
async function createAccount(name, phone_number, nik, access_code, password) {
  return authenticationDigitalBanking.create({
    name,
    phone_number,
    nik,
    access_code,
    password,
  });
}

/**
 * Update existing attempt
 * @param {string} phone_number - phone number
 * @returns {Promise}
 */
async function updateAccount(phone_number) {
  return authenticationDigitalBanking.updateOne(
    {
      phone_number: phone_number,
    },
    {
      $set: {
        account,
        account_number,
      },
    }
  );
}

/**
 * Delete attempt
 * @param {string} account_number - account number
 * @returns {Promise}
 */
async function deleteAccount(account_number) {
  return authenticationDigitalBanking.deleteOne({
    account_number: account_number,
  });
}

module.exports = {
  getAccounts,
  getAccount,
  createAccount,
  updateAccount,
  deleteAccount,
};
