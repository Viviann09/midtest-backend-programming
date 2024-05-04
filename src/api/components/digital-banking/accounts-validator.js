const joi = require('joi');
const { joiPasswordExtendCore } = require('joi-password');
const joiPassword = joi.extend(joiPasswordExtendCore);

module.exports = {
  createAccount: {
    body: {
      name: joi.string().min(1).max(100).required().label('Name'),
      phone_number: joi.string().required().label('Phone_number'),
      nik: joi.string().min(1).max(16).required().label('NIK'),
      access_code: joi.string().max(6).required().label('Access_code'),
      password: joiPassword
        .string()
        .minOfSpecialCharacters(1)
        .minOfLowercase(1)
        .minOfUppercase(1)
        .minOfNumeric(1)
        .noWhiteSpaces()
        .onlyLatinCharacters()
        .min(6)
        .max(32)
        .required()
        .label('Password'),
      password_confirm: joi.string().required().label('Password confirmation'),
    },
  },

  getAccount: {
    body: {
      account_number: joi
        .string()
        .min(1)
        .max(15)
        .required()
        .label('account_number'),
      account_balance: joi
        .string()
        .min(1)
        .max(13)
        .required()
        .label('account_balance'),
    },
  },

  updateAccount: {
    body: {
      account_number: joi.string().max(15).required().label('account_number'),
      phone_number: joi.string().max(12).required().label('phone_number'),
    },
  },

  changePassword: {
    body: {
      password_old: joi.string().required().label('Old password'),
      password_new: joiPassword
        .string()
        .minOfSpecialCharacters(1)
        .minOfLowercase(1)
        .minOfUppercase(1)
        .minOfNumeric(1)
        .noWhiteSpaces()
        .onlyLatinCharacters()
        .min(6)
        .max(32)
        .required()
        .label('New password'),
      password_confirm: joi.string().required().label('Password confirmation'),
    },
  },
};
