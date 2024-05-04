const joi = require('joi');

module.exports = {
  login: {
    body: {
      access_code: joi.string().max(6).required().label('Access code'),
      password: joi.string().required().label('Password'),
    },
  },
};
