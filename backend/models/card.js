import mongoose from 'mongoose';
import validator from 'validator';

import SchemaWithEscapedFields from '../utils/SchemaWithEscapedFields.js';

const cardSchema = new SchemaWithEscapedFields({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: (v) => validator.isURL(v, { require_protocol: true }),
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'user',
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, ['name']);

export default mongoose.model('card', cardSchema);
