/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const { hashSync, compareSync } = require('bcrypt-nodejs');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const uniqueValidator = require('mongoose-unique-validator');

const { passwordRegex } = require('./../validations/user.validation');
const constants = require('./../../config/constants');

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: [true, 'Email is required'],
      trim: true,
      validate: {
        validator (email) {
          return validator.isEmail(email);
        },
        message: '{VALUE} is not valid email!'
      }
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      trim: true,
      minlength: [6, 'Password needs to be longer!'],
      validate: {
        validator (password) {
          return passwordRegex.test(password);
        },
        message: '{VALUE} is not valid password'
      }
    }
  },
  { timestamps: true }
);

UserSchema.plugin(uniqueValidator, {
  message: '{VALUE} böyle bir kullanıcı zaten var!'
});

// eslint-disable-next-line func-names
UserSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    this.password = this._hashPassword(this.password);
  }
  next();
});

UserSchema.methods = {
  _hashPassword (password) {
    return hashSync(password);
  },
  authenticateUser (password) {
    return compareSync(password, this.password);
  },
  createToken () {
    return jwt.sign(
      {
        ID: this._id
      },
      constants.JWT_SECRET
    );
  },
  toAuthJSON () {
    return {
      token: this.createToken()
    };
  },
  toJSON () {
    return {
      ID: this._id,
      email: this.email
    };
  }
};

export default mongoose.model('User', UserSchema);
