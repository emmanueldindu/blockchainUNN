const Joi = require('joi');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: Number,
  },
  career: {
    type: String,
  },
  state: {
    type: String,
  },
});

function validateUser(data) {
  const schema = Joi.object({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.number().required(),
    career: Joi.string().required(),
    state: Joi.string().required(),
  });

  return schema.validate(data);
}

const User = mongoose.model('User', UserSchema);

module.exports = User;
module.exports.validateUser = validateUser;
