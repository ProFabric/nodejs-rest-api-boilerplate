const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
// const CompanyModel = require('./../models/company.model');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');

const constants = require('./../../config/constants');
const UserModel = require('./../models/user.model');

const localOpts = {
  usernameField: 'email',
  passwordField: 'password'
};

const localStrategy = new LocalStrategy(localOpts, async(email, password, done) => {
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return done(null, false);
    }

    if (!user.authenticateUser(password)) {
      return done(null, false);
    }

    // user.company = await CompanyModel.findOne({ _id: user.companyID });

    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
});

const jwtOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: constants.JWT_SECRET
};

const jwtStrategy = new JwtStrategy(jwtOpts, async(payload, done) => {
  try {
    const user = await UserModel.findById(payload.ID);
    if (!user) {
      return done(null, false);
    }
    // user.company = await CompanyModel.findOne({ _id: user.companyID });
    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
});

passport.use(localStrategy);
passport.use(jwtStrategy);

module.exports = {
  authLocal: passport.authenticate('local', { session: false }),
  authJwt: passport.authenticate('jwt', { session: false })
};
