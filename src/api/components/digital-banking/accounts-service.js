const accountsRepository = require('./accounts-repository');
const { hashPassword, passwordMatched } = require('../../../utils/password');

/**
 * Get list of accounts
 * @param {string} name - Name
 * @param {string} email - Email
 * @param {string} phone_number - phone number
 * @param {date} birthDate - birth date
 * @param {string} address - address
 * @param {string} nik - Nik
 * @param {string} access_code - Access code
 * @param {string} account_number - Account number
 * @param {string} account_balance - Account balance
 * @returns {Array}
 */
async function getAccounts(
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
  const accounts = await accountsRepository.getAccounts(
    name,
    email,
    phone_number,
    birthDate,
    address,
    nik,
    access_code,
    account_number,
    account_balance
  );

  const results = [];
  for (let i = 0; i < accounts.length; i += 1) {
    const account = accounts[i];
    results.push({
      name: account.name,
      email: account.email,
      phone_number: account.phone_number,
      birthDate: account.birtDate,
      address: account.address,
      nik: account.nik,
      access_code: account.access_code,
      account_number: account.account_number,
      account_balance: account.account_balance,
    });
  }

  return results;
}

/**
 * Get account detail
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
 * @returns {Object}
 */
async function getAccount(id) {
  const account = await accountsRepository.getAccountId(id);

  // Account not found
  if (!account) {
    return null;
  }

  return {
    name: account.name,
    email: account.email,
    phone_number: account.phone_number,
    birthDate: account.birtDate,
    address: account.address,
    nik: account.nik,
    access_code: account.access_code,
    account_number: account.account_number,
    account_balance: account.account_balance,
  };
}

/**
 * Create new account
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
 * @returns {boolean}
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
  // Hash password
  const hashedPassword = await hashPassword(password);

  try {
    await accountsRepository.createAccount(
      name,
      email,
      phone_number,
      birthDate,
      address,
      nik,
      access_code,
      account_number,
      account_balance,
      hashedPassword
    );
  } catch (err) {
    return null;
  }

  return true;
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
 * @returns {boolean}
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
  const account = await accountsRepository.getAccountId(
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
  );

  // Account not found
  if (!account) {
    return null;
  }

  try {
    await accountsRepository.updateAccount(
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
    );
  } catch (err) {
    return null;
  }

  return true;
}

/**
 * Delete account
 * @param {string} id - id
 * @returns {boolean}
 */
async function deleteAccount(id) {
  const account = await accountsRepository.getAccountId(id);

  // Account not found
  if (!account) {
    return null;
  }

  try {
    await accountsRepository.deleteAccount(id);
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
    await accountsRepository.getAccountByAccountNumber(account_number);

  if (account) {
    return true;
  }

  return false;
}

/**
 * Check whether the password is correct
 * @param {string} id - id
 * @param {string} password - Password
 * @returns {boolean}
 */
async function checkPassword(id, password) {
  const account = await accountsRepository.getAccountId(id);
  return passwordMatched(password, account.password);
}

/**
 * Change account password
 * @param {string} id - id
 * @param {string} password - Password
 * @returns {boolean}
 */
async function changePassword(id, password) {
  const account = await accountsRepository.getAccountId(id);

  // Check if account not found
  if (!account) {
    return null;
  }

  const hashedPassword = await hashPassword(password);

  const changeSuccess = await accountsRepository.changePassword(
    id,
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
