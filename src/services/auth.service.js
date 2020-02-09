import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import Constants from '../../config/constants';
import UserModel from '../models/user.model';

const localOpts = {
  usernameField: 'email',
  passwordField: 'password'
};

const localStrategy = new LocalStrategy(localOpts, async (email, password, done) => {
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return done(null, false);
    }

    if (!user.authenticateUser(password)) {
      return done(null, false);
    }

    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
});

const jwtOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: Constants.JWT_SECRET
};

const jwtStrategy = new JwtStrategy(jwtOpts, async (payload, done) => {
  try {
    const user = await UserModel.findById(payload.ID);
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
});

passport.use(localStrategy);
passport.use(jwtStrategy);

export default {
  authLocal: passport.authenticate('local', { session: false }),
  authJwt: passport.authenticate('jwt', { session: false })
};
