const joi = require('joi');
const { joiPasswordExtendCore } = require('joi-password');
const joiPassword = joi.extend(joiPasswordExtendCore);

module.exports = {
  createAccount: {
    body: {
      name: joi.string().min(1).max(100).required().label('Name'),
      email: joi.string().email().required().label('Email'),
      phone_number: joi
        .number()
        .min(1)
        .max(13)
        .required()
        .label('Phone_number'),
      birthDate: joi.date().required().label('Account birth date'),
      address: joi.string().min(1).max(200).required().label('Address'),
      nik: joi.number().min(1).max(16).required().label('NIK'),
      access_code: joi.string().min(1).max(6).required().label('Access_code'),
      account_number: joi.number().max(10).required().label('Account_number'),
      account_balance: joi.number().max(12).required().label('Account_balance'),
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
        .number()
        .min(1)
        .max(15)
        .required()
        .label('account_number'),
      account_balance: joi
        .number()
        .min(1)
        .max(13)
        .required()
        .label('account_balance'),
    },
  },

  updateAccount: {
    body: {
      phone_number: joi
        .number()
        .min(1)
        .max(12)
        .required()
        .label('phone_number'),
      access_code: joi.string().min(1).max(6).required().label('Access_code'),
      account_balance: joi
        .number()
        .min(1)
        .max(12)
        .required()
        .label('Account_balance'),
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
