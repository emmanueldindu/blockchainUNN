const Joi = require('joi');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female']
  },
  career: {
    type: String,
    enum: ['Coding/Development', 'Content Writing', 'Design', 'Community Management', 'Others']
  },
  student: {
    type: String,
    enum: ['Yes', 'No']
  },
  residence: {
    type: String,
    enum: ['UNN/Nsukka', 'UNEC/Enugu', 'Others']
  },
  attend: {
    type: String,
    enum: ['Yes', 'No']
  }
});

function validateUser(data) {
  const schema = Joi.object({
  fullname: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  gender: Joi.string().valid('Male', 'Female').required(),
  career: Joi.string().required(),
  student: Joi.string().valid('Yes', 'No').required(),
  residence: Joi.string().valid('UNN/Nsukka', 'UNEC/Enugu', 'Others').required(),
  attend: Joi.string().valid('Yes', 'No').required()
  });

  return schema.validate(data);
}

const User = mongoose.model('User', UserSchema);

module.exports = User;
module.exports.validateUser = validateUser;
