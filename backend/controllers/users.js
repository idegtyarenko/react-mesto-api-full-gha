import { Error as MongooseError } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user.js';
import { messages, statusCodes } from '../utils/constants.js';
import { JWT_KEY } from '../utils/config.js';
import NotFoundError from '../errors/NotFoundError.js';
import InvalidIdError from '../errors/InvalidIdError.js';
import ValidationError from '../errors/ValidationError.js';
import ConflictingEmailError from '../errors/ConflictingEmailError.js';

const MILLISECONDS_IN_A_WEEK = 1000 * 60 * 60 * 24 * 7;

const { ValidationError: MongooseValidationError, CastError } = MongooseError;

export function getUsers(req, res, next) {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
}

function sendUserFoundById(id, res, next) {
  User.findById(id)
    .then((user) => {
      if (user === null) {
        throw new NotFoundError();
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err instanceof CastError) {
        next(new InvalidIdError());
      } else {
        next(err);
      }
    });
}

export async function getUserById(req, res, next) {
  sendUserFoundById(req.params.id, res, next);
}

export async function getCurrentUser(req, res, next) {
  sendUserFoundById(req.user._id, res, next);
}

export function createUser(req, res, next) {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      email: req.body.email,
      password: hash,
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar,
    }))
    .then((user) => {
      const response = res.status(statusCodes.CREATED);
      sendUserFoundById(user._id, response, next);
    })
    .catch((err) => {
      if (err instanceof MongooseValidationError) {
        next(new ValidationError());
      } else if (err.code === 11000) {
        next(new ConflictingEmailError());
      } else {
        next(err);
      }
    });
}

export function login(req, res, next) {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        JWT_KEY,
        { expiresIn: '7d' },
      );
      res
        .cookie('jwt', token, {
          maxAge: MILLISECONDS_IN_A_WEEK,
          httpOnly: true,
          sameSite: true,
        })
        .send({ message: messages.LOGIN_SUCCESFUL });
    })
    .catch(next);
}

export function logout(req, res) {
  res
    .cookie('jwt', '', {
      maxAge: 0,
      sameSite: true,
    })
    .send({ message: messages.LOGOUT_SUCCESFUL });
}

export async function updateUser(req, res, next) {
  await User.findByIdAndUpdate(
    req.user._id,
    req.body,
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (user === null) {
        throw new NotFoundError();
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err instanceof CastError) {
        next(new InvalidIdError());
      } else if (err instanceof MongooseValidationError) {
        next(new ValidationError());
      } else {
        next(err);
      }
    });
}
