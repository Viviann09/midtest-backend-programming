const authenticationRepositoryDigitalBankings = require('./authentication-repository-digital-banking');
const { generateToken } = require('../../../utils/session-token');
const { passwordMatched } = require('../../../utils/password');

/**
 * Check account_number for login.
 * @param {string} account_number - Account number
 * @param {string} password - Password
 * @returns {object} An object containing, among others, the JWT token if the email and password are matched. Otherwise returns null.
 */
async function checkLoginCredentialss(email, password) {
  const account =
    await authenticationRepositoryDigitalBankings.getAccountByEmail(email);

  // We define default account password here as '<RANDOM_PASSWORD_FILTER>'
  // to handle the case when the account login is invalid. We still want to
  // check the password anyway, so that it prevents the attacker in
  // guessing login credentials by looking at the processing time.
  const accountPassword = account
    ? account.password
    : '<RANDOM_PASSWORD_FILLER>';
  const passwordChecked = await passwordMatched(password, accountPassword);
  // Because we always check the password (see above comment), we define the
  // login attempt as successful when the `account` is found (by email) and
  // the password matches.
  if (account && passwordChecked) {
    return {
      name: account.name,
      email: account.email,
      token: generateToken(account.email, account.id),
    };
  }

  return null;
}

module.exports = {
  checkLoginCredentialss,
};
