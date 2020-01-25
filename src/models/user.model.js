/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const { hashSync, compareSync } = require('bcrypt-nodejs');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const uniqueValidator = require('mongoose-unique-validator');

const { passwordRegex } = require('./../validations/user.validation');
const constants = require('./../../config/constants');

const UserSchema = new mongoose.Schema(
  {
    companyID: {
      type: Schema.Types.ObjectId,
      required: [true, 'Çalışan bir firmaya bağlı olmalı'],
      ref: 'Company',
      index: true
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Email is required'],
      trim: true,
      validate: {
        validator(email) {
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
        validator(password) {
          return passwordRegex.test(password);
        },
        message: '{VALUE} is not valid password'
      }
    },
    nationalIdentityNumber: {
      type: String,
      required: [false],
      trim: true
      // unique: true,
      // sparse: true
    },
    phone: {
      code: {
        type: String,
        trim: true,
        required: [false],
        maxlength: [5, 'Telefon kodu çok uzun']
      },
      number: {
        type: String,
        trim: true,
        required: [false],
        minlength: [3, 'Telefon numarası en az 3 karakter bulundurmalıdır'],
        maxlength: [50, 'Telefon numarası çok uzun']
      }
    },
    role: {
      type: String,
      enum: ['ADMIN', 'DOCTOR', 'EXPERT', 'USER'],
      default: 'USER',
      required: [true, 'Role is required'],
      trim: true
    },
    firstName: {
      type: String,
      required: [true, 'Firstname is required'],
      trim: true
    },
    lastName: {
      type: String,
      required: [true, 'Lastname is required'],
      trim: true
    },
    image: {
      type: String,
      required: false,
      trim: true
    }
  },
  { timestamps: true }
);

UserSchema.plugin(uniqueValidator, {
  message: '{VALUE} böyle bir kullanıcı zaten var!'
});

// eslint-disable-next-line func-names
UserSchema.pre('save', function(next) {
  if (this.isModified('password')) {
    this.password = this._hashPassword(this.password);
  }
  next();
});

UserSchema.methods = {
  _hashPassword(password) {
    return hashSync(password);
  },
  authenticateUser(password) {
    return compareSync(password, this.password);
  },
  createToken() {
    return jwt.sign(
      {
        // eslint-disable-next-line no-underscore-dangle
        ID: this._id
      },
      constants.JWT_SECRET
    );
  },
  toAuthJSON() {
    return {
      token: this.createToken()
    };
  },
  toJSON() {
    return {
      companyID: this.companyID,
      // eslint-disable-next-line no-underscore-dangle
      ID: this._id,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      phone: this.phone,
      nationalIdentityNumber: this.nationalIdentityNumber,
      role: this.role,
      image: this.image
    };
  }
};

module.exports = mongoose.model('User', UserSchema);
