const authenticationRepositoryDigitalBanking = require('./authentication-repository-digital-banking');

/**
 * Check account_number for login.
 * @param {string} account_number - Account number
 * @param {string} password - Password
 * @returns {object} An object containing, among others, the JWT token if the email and password are matched. Otherwise returns null.
 */
async function checkLoginCredentials(account_number, password) {
  const Account =
    await authenticationRepositoryDigitalBanking.getAccountByAccountNumber(
      account_number
    );

  // We define default user password here as '<RANDOM_PASSWORD_FILTER>'
  // to handle the case when the user login is invalid. We still want to
  // check the password anyway, so that it prevents the attacker in
  // guessing login credentials by looking at the processing time.
  const AccountPassword = Account
    ? account.password
    : '<RANDOM_PASSWORD_FILLER>';
  const passwordChecked = await passwordMatched(password, accountPassword);

  // Because we always check the password (see above comment), we define the
  // login attempt as successful when the `user` is found (by email) and
  // the password matches.
  if (account_number && passwordChecked) {
    return {
      name: user.name,
      account_number: account.account_number,
      token: generateToken(account.account_number),
    };
  }

  return null;
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
async function createAccount(name, phone_number, nik, access_code, password) {
  try {
    await authenticationrepositorydigitalBanking.createAccount(
      name,
      phone_number,
      nik,
      access_code,
      password
    );
  } catch (err) {
    return null;
  }

  return true;
}

/**
 * Get account detail
 * @param {string} account_number - account number
 * @param {string} account_balance - account balance
 * @returns {Object}
 */
async function getAccount(account_number, account_balance) {
  const get_account = await authenticationrepositorydigitalBanking.getAccount(
    account_number,
    account_balance
  );
  if (!get_account) {
    return null;
  }
  return get_account.account;
}

/**
 * Update existing attempt
 * @param {string} phone_number - phone number
 * @returns {boolean}
 */
async function updateAccount(phone_number) {
  try {
    await authenticationrepositorydigitalBanking.updateAccount(phone_number);
  } catch (err) {
    return null;
  }

  return true;
}

/**
 * Delete Attempt
 * @param {string} account_number - account number
 * @returns {boolean}
 */
async function deleteAccount(account_number) {
  try {
    await authenticationrepositorydigitalBanking.deleteAccount(account_number);
  } catch (err) {
    return null;
  }

  return true;
}

module.exports = {
  checkLoginCredentials,
  createAccount,
  getAccount,
  updateAccount,
  deleteAccount,
};
