import { Joi } from 'celebrate';

export const idParamSchema = {
  id: Joi.string().length(24),
};

export const credentialFieldsSchema = {
  email: Joi.string().email().required(),
  password: Joi.string().required().min(6).max(30),
};

export const profileFieldsSchema = {
  name: Joi.string().min(2).max(40),
  about: Joi.string().min(2).max(80),
};

export const avatarFieldsSchema = {
  avatar: Joi.string().uri({ scheme: ['http', 'https'] }),
};

export const cardFieldsSchema = {
  name: Joi.string().required().min(2).max(30),
  link: Joi.string().required().uri({ scheme: ['http', 'https'] }),
};
