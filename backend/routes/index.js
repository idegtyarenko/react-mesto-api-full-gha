import express from 'express';
import { celebrate, Joi } from 'celebrate';

import usersRouter from './users.js';
import cardsRouter from './cards.js';
import auth from '../middlewares/auth.js';
import { credentialFieldsSchema, profileFieldsSchema, avatarFieldsSchema } from '../utils/schemas.js';
import { createUser, login } from '../controllers/users.js';

const router = express.Router();

router.use('/users', auth, usersRouter);
router.use('/cards', auth, cardsRouter);

router.post('/signup', celebrate({
  body: Joi.object().keys({
    ...credentialFieldsSchema,
    ...profileFieldsSchema,
    ...avatarFieldsSchema,
  }),
}), createUser);
router.post('/signin', celebrate({
  body: Joi.object().keys(credentialFieldsSchema),
}), login);

export default router;
