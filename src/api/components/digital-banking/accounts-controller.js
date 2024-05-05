const accountsService = require('./accounts-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

/**
 * Handle get list of accounts request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function getAccounts(request, response, next) {
  try {
    const accounts = await accountsService.getAccounts();
    return response.status(200).json(accounts);
  } catch (error) {
    return next(error);
  }
}

/**
 * Handle get account detail request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function getAccount(request, response, next) {
  try {
    const account = await accountsService.getAccount(request.params.id);

    if (!account) {
      throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Unknown account');
    }

    return response.status(200).json(account);
  } catch (error) {
    return next(error);
  }
}

/**
 * Handle create account request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function createAccount(request, response, next) {
  try {
    const name = request.body.name;
    const email = request.body.email;
    const phone_number = request.body.phone_number;
    const nik = request.body.nik;
    const access_code = request.body.access_code;
    const account_number = request.body.account_number;
    const account_balance = request.body.account_balance;
    const password = request.body.password;
    const password_confirm = request.body.password_confirm;

    // Check confirmation password
    if (password !== password_confirm) {
      throw errorResponder(
        errorTypes.INVALID_PASSWORD,
        'Password confirmation mismatched'
      );
    }

    const success = await accountsService.createAccount(
      name,
      email,
      phone_number,
      nik,
      access_code,
      account_number,
      account_balance,
      password
    );
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to create account'
      );
    }

    return response.status(200).json({ name, account_number });
  } catch (error) {
    return next(error);
  }
}

/**
 * Handle update account request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function updateAccount(request, response, next) {
  try {
    const id = request.params.id;
    const phone_number = request.body.phone_number;

    const success = await accountsService.updateAccount(id, phone_number);
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to update phone number'
      );
    }

    return response.status(200).json({ id });
  } catch (error) {
    return next(error);
  }
}

/**
 * Handle delete account request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function deleteAccount(request, response, next) {
  try {
    const id = request.params.id;

    const success = await accountsService.deleteAccount(id);
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to delete account'
      );
    }

    return response.status(200).json({ id });
  } catch (error) {
    return next(error);
  }
}

/**
 * Handle change account password request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function changePassword(request, response, next) {
  try {
    // Check password confirmation
    if (request.body.password_new !== request.body.password_confirm) {
      throw errorResponder(
        errorTypes.INVALID_PASSWORD,
        'Password confirmation mismatched'
      );
    }

    // Check old password
    if (
      !(await accountsService.checkPassword(
        request.params.id,
        request.body.password_old
      ))
    ) {
      throw errorResponder(errorTypes.INVALID_CREDENTIALS, 'Wrong password');
    }

    const changeSuccess = await accountsService.changePassword(
      request.params.id,
      request.body.password_new
    );

    if (!changeSuccess) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to change password'
      );
    }

    return response.status(200).json({ id: request.params.id });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getAccounts,
  getAccount,
  createAccount,
  updateAccount,
  deleteAccount,
  changePassword,
};
