const accountsRepository = require('./accounts-repository');
const { hashPassword, passwordMatched } = require('../../../utils/password');

/**
 * Get list of accounts
 * @returns {Array}
 */
async function getAccounts() {
  const accounts = await accountsRepository.getAccounts();

  const results = [];
  for (let i = 0; i < Accounts.length; i += 1) {
    const account = users[i];
    results.push({
      name: account.name,
      account_number: account.account_number,
      account_balance: account.account_balance,
    });
  }

  return results;
}

/**
 * Get account detail
 * @param {string} account_number - account number
 * @param {string} account_balance - account balance
 * @returns {Object}
 */
async function getAccount(account_number, account_balance) {
  const account = await accountsRepository.getAccount(
    account_number,
    account_balance
  );

  // Account not found
  if (!account) {
    return null;
  }

  return {
    name: account.name,
    account_number: account.account_number,
    account_balance: account.account_balance,
  };
}

/**
 * Create new account
 * @param {string} name - Name
 * @param {string} phone_number - phone number
 * @param {string} nik - Nik
 * @param {string} access_code - Access code
 * @param {string} password - Password
 * @returns {boolean}
 */
async function createAccount(name, phone_number, nik, password) {
  // Hash password
  const hashedPassword = await hashPassword(password);

  try {
    await accountsRepository.createAccount(
      name,
      phone_number,
      nik,
      access_code,
      hashedPassword
    );
  } catch (err) {
    return null;
  }

  return true;
}

/**
 * Update existing account
 * @param {string} phone_number - phone number
 * @returns {boolean}
 */
async function updateAccount(phone_number) {
  const account = await accountsRepository.getAccount(phone_number);

  // Account not found
  if (!account) {
    return null;
  }

  try {
    await accountsRepository.updateAccount(phone_number);
  } catch (err) {
    return null;
  }

  return true;
}

/**
 * Delete user
 * @param {string} account_number - account number
 * @returns {boolean}
 */
async function deleteAccount(account_number) {
  const account = await accountsRepository.getAccount(account_number);

  // Account not found
  if (!account) {
    return null;
  }

  try {
    await accountsRepository.deleteAccount(account_number);
  } catch (err) {
    return null;
  }

  return true;
}

/**
 * Check whether the account_number is registered
 * @param {string} account_number - account number
 * @returns {boolean}
 */
async function account_numbersRegistered(account_number) {
  const account =
    await accountsRepository.getAccountByAccount_number(account_number);

  if (account) {
    return true;
  }

  return false;
}

/**
 * Check whether the password is correct
 * @param {string} account_number - account number
 * @param {string} password - Password
 * @returns {boolean}
 */
async function checkPassword(accountAccount_number, password) {
  const account = await accountsRepository.getUser(accountAccount_number);
  return passwordMatched(password, account.password);
}

/**
 * Change account password
 * @param {string} account_number - account number
 * @param {string} password - Password
 * @returns {boolean}
 */
async function changePassword(accountAccount_number, password) {
  const account = await accountsRepository.getUser(accountAccount_number);

  // Check if account not found
  if (!account) {
    return null;
  }

  const hashedPassword = await hashPassword(password);

  const changeSuccess = await accountsRepository.changePassword(
    accountAccount_number,
    hashedPassword
  );

  if (!changeSuccess) {
    return null;
  }

  return true;
}

module.exports = {
  getAccounts,
  getAccount,
  createAccount,
  updateAccount,
  deleteAccount,
  account_numbersRegistered,
  checkPassword,
  changePassword,
};
