import express from 'express';
import { celebrate, Joi } from 'celebrate';

import {
  getUsers,
  getUserById,
  updateUser,
  getCurrentUser,
} from '../controllers/users.js';
import { idParamSchema, profileFieldsSchema, avatarFieldsSchema } from '../utils/schemas.js';

const router = express.Router();

router.get('/', getUsers);

router.get('/me', getCurrentUser);

router.get('/:id', celebrate({
  params: Joi.object().keys(idParamSchema),
}), getUserById);

router.patch('/me', celebrate({
  body: Joi.object().keys(profileFieldsSchema),
}));
router.patch('/me', updateUser);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys(avatarFieldsSchema),
}));
router.patch('/me/avatar', updateUser);

export default router;
