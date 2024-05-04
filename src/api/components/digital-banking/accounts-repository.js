const { Account } = require('../../../models');

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
  return Account.create({
    name,
    phone_number,
    nik,
    access_code,
    password,
  });
}

/**
 * Update existing user
 * @param {string} phone_number - phone number
 * @returns {Promise}
 */
async function updateUser(phone_number) {
  return User.updateOne(
    {
      _phone_number: phone_number,
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
 * Delete a user
 * @param {string} account_number - account number
 * @returns {Promise}
 */
async function deleteAccount(account_number) {
  return Account.deleteOne({ _account_number: account_number });
}

/**
 * Get user by account number to prevent duplicate account number
 * @param {string} account_number - account number
 * @returns {Promise}
 */
async function getAccountByAccountNumber(account_number) {
  return Account.findOne({ account_number });
}

/**
 * Update user password
 * @param {string} account_number - account number
 * @param {string} password - New hashed password
 * @returns {Promise}
 */
async function changePassword(account_number, password) {
  return Account.updateOne(
    { _account_number: account_number },
    { $set: { password } }
  );
}

module.exports = {
  getAccounts,
  getAccount,
  createAccount,
  updateUser,
  deleteAccount,
  getAccountByAccountNumber,
  changePassword,
};
