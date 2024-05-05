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
 * @param {string} email - Email
 * @param {string} id - id
 * @returns {Promise}
 */
async function getAccount(email) {
  return Account.findOne({ email });
}

async function getAccountId(id) {
  return Account.findById(id);
}

/**
 * Create new account
 * @param {string} name - Name
 * @param {string} email - Email
 * @param {string} phone_number - phone number
 * @param {date} birthDate - birth date
 * @param {string} address - address
 * @param {string} nik - Nik
 * @param {string} access_code - Access code
 * @param {string} account_number - Account number
 * @param {string} account_balance - Account balance
 * @param {string} password - Password
 * @returns {Promise}
 */
async function createAccount(
  name,
  email,
  phone_number,
  birthDate,
  address,
  nik,
  access_code,
  account_number,
  account_balance,
  password
) {
  return Account.create({
    name,
    email,
    phone_number,
    birthDate,
    address,
    nik,
    access_code,
    account_number,
    account_balance,
    password,
  });
}

/**
 * Update existing account
 * @param {string} id - id
 * @param {string} name - Name
 * @param {string} email - Email
 * @param {string} phone_number - phone number
 * @param {date} birthDate - birth date
 * @param {string} address - address
 * @param {string} nik - Nik
 * @param {string} access_code - Access code
 * @param {string} account_number - Account number
 * @param {string} account_balance - Account balance
 * @param {string} password - Password
 * @returns {Promise}
 */
async function updateAccount(
  id,
  name,
  email,
  phone_number,
  birthDate,
  address,
  nik,
  access_code,
  account_number,
  account_balance
) {
  return Account.updateOne(
    {
      _id: id,
    },
    {
      $set: {
        name,
        email,
        phone_number,
        birthDate,
        address,
        nik,
        access_code,
        account_number,
        account_balance,
      },
    }
  );
}

/**
 * Delete account
 * @param {string} id - id
 * @returns {Promise}
 */
async function deleteAccount(id) {
  return Account.deleteOne({ _id: id });
}

/**
 * Get account by account number to prevent duplicate account number
 * @param {string} id - id
 * @returns {Promise}
 */
async function getAccountByAccountNumber(id) {
  return Account.findOne({ id });
}

/**
 * Update account password
 * @param {string} id - Account ID
 * @param {string} password - New hashed password
 * @returns {Promise}
 */
async function changePassword(id, password) {
  return Account.updateOne({ _id: id }, { $set: { password } });
}

module.exports = {
  getAccounts,
  getAccount,
  getAccountId,
  createAccount,
  updateAccount,
  deleteAccount,
  getAccountByAccountNumber,
  changePassword,
};
