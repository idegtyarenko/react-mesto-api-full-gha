import { Error as MongooseError } from 'mongoose';

import Card from '../models/card.js';
import { messages, statusCodes } from '../utils/constants.js';
import NotFoundError from '../errors/NotFoundError.js';
import CannotDeleteOthersCardError from '../errors/CannotDeleteOthersCardError.js';
import InvalidIdError from '../errors/InvalidIdError.js';
import ValidationError from '../errors/ValidationError.js';

const { ValidationError: MongooseValidationError, CastError } = MongooseError;

export async function doesUserOwnCard(req, res, next) {
  const currentUserId = req.user._id;
  let card;
  try {
    card = await Card.findById(req.params.id);
    if (card === null) {
      next(new NotFoundError());
    } else if (currentUserId.toString() !== card.owner._id.toString()) {
      next(new CannotDeleteOthersCardError());
    }
  } catch (err) {
    if (err instanceof CastError) {
      next(InvalidIdError);
    } else {
      next(err);
    }
  }
  next();
}

export function getCards(req, res, next) {
  Card.find({})
    .then((data) => res.send(data))
    .catch(next);
}

export function deleteCardById(req, res, next) {
  Card.findByIdAndRemove(req.params.id)
    .then(() => res.send({ message: messages.POST_DELETED }))
    .catch(next);
}

export async function createCard(req, res, next) {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => Card.findById(card._id))
    .then((data) => res.status(statusCodes.CREATED).send(data))
    .catch((err) => {
      if (err instanceof MongooseValidationError) {
        next(new ValidationError());
      } else {
        next(err);
      }
    });
}

export async function addLike(req, res, next) {
  let card;
  try {
    card = await Card.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );
    if (card === null) {
      throw new NotFoundError();
    } else {
      res.send(card);
    }
  } catch (err) {
    if (err instanceof CastError) {
      next(InvalidIdError());
    } else {
      next(err);
    }
  }
}

export async function removeLike(req, res, next) {
  let card;
  try {
    card = await Card.findByIdAndUpdate(
      req.params.id,
      { $pull: { likes: req.user._id } },
      { new: true },
    );
    if (card === null) {
      throw new NotFoundError();
    } else {
      res.send(card);
    }
  } catch (err) {
    if (err instanceof CastError) {
      next(InvalidIdError());
    } else {
      next(err);
    }
  }
}
