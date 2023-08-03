import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';

import SchemaWithEscapedFields from '../utils/SchemaWithEscapedFields.js';
import { DEFAULT_USER } from '../utils/constants.js';
import InvalidCredentialsError from '../errors/InvalidCredentialsError.js';

const userSchema = new SchemaWithEscapedFields({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: (v) => validator.isEmail(v),
  },
  password: {
    type: String,
    required: true,
    validate: (v) => /^\$2[aby]?\$\d{1,2}\$[./A-Za-z0-9]{53}$/.test(v),
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 40,
    default: DEFAULT_USER.name,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 80,
    default: DEFAULT_USER.about,
  },
  avatar: {
    type: String,
    required: true,
    validate: (v) => /https?:\/\/[a-z0-9\-._~:/?#[\]@!$&'()*+,;=]+/.test(v),
    default: DEFAULT_USER.avatar,
  },
}, ['name', 'about']);

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new InvalidCredentialsError());
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new InvalidCredentialsError());
          }
          return user;
        });
    });
};

export default mongoose.model('user', userSchema);
