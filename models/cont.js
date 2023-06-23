const Joi = require('joi');
const mongoose = require('mongoose');

const ContSchema = new mongoose.Schema({
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
  
  
  student: {
    type: String,
    enum: ['Yes', 'No']
    },
  
    institution: {
        type: String,
        enum: ['UNN/NSUKKA', 'UNN/UNEC', 'Others', 'I am not a student']
    },
    

    
    rate: {
        type: String,
        enum: ['0 - First encounter was at the conference', '10-30 - Know a thing or two about it', '40-70 - Pretty knowledgeable about it', '80-100 - Im very knowledgeable about it']
    },
    

    hours: {
        type: String,
        enum: ['10 hours', '15 hours', '20 hours', ]
    },
    
  
});

function validateUser(data) {
  const schema = Joi.object({
  fullname: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  gender: Joi.string().valid('Male', 'Female').required(),

  student: Joi.string().valid('Yes', 'No').required(),
  institution: Joi.string().valid('UNN/NSUKKA', 'UNN/UNEC', 'Others', 'I am not a student').required(),
  
      rate: Joi.string().valid('0 - First encounter was at the conference', '10-30 - Know a thing or two about it', '40-70 - Pretty knowledgeable about it', '80-100 - Im very knowledgeable about it').required(),
    hours: Joi.string().valid('10 hours', '15 hours', '20 hours').required()
  
  });

  return schema.validate(data);
}

const Cont = mongoose.model('Cont', ContSchema);

module.exports = Cont;
module.exports.validateUser = validateUser;
