import express from 'express';
import { celebrate, Joi } from 'celebrate';

import {
  getCards,
  createCard,
  doesUserOwnCard,
  deleteCardById,
  addLike,
  removeLike,
} from '../controllers/cards.js';
import { idParamSchema, cardFieldsSchema } from '../utils/schemas.js';

const router = express.Router();

router.get('/', getCards);

router.delete('/:id', celebrate({
  params: Joi.object().keys(idParamSchema),
}));
router.delete('/:id', doesUserOwnCard);
router.delete('/:id', deleteCardById);

router.post('/', celebrate({
  body: Joi.object().keys(cardFieldsSchema),
}), createCard);

router.put('/:id/likes', celebrate({
  params: Joi.object().keys(idParamSchema),
}), addLike);

router.delete('/:id/likes', celebrate({
  params: Joi.object().keys(idParamSchema),
}), removeLike);

export default router;
