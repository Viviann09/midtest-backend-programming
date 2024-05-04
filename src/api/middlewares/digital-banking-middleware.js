const passport = require('passport');
const passportJWT = require('passport-jwt');

const config = require('../../core/config');
const { Account } = require('../../models');

// Authenticate account based on the JWT token
passport.use(
  'account',
  new passportJWT.Strategy(
    {
      jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderWithScheme('jwt'),
      secretOrKey: config.secret.jwt,
    },
    async (payload, done) => {
      const account = await Account.findOne({
        account_number: payload.account_account_number,
      });
      return account ? done(null, user) : done(null, false);
    }
  )
);

module.exports = passport.authenticate('account', { session: false });
