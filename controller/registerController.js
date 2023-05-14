const User  = require('../models/user');
const Joi = require('joi');
const mongoose = require('mongoose');




const getAllUsers = async (req, res, next) => {
    const list = await User.find().exec()

}

const getAlluserView = (req, res, next) => {
    res.render('addUser')
}

const addUser = async (req, res, next) => {
    const data = req.body;
  
    delete data.register;
  
    // Validate user object using Joi
    const { error } = validateUser(data);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
  
    // Create a new user instance
    const newUser = new User({
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      phone: data.phone,
      career: data.career,
      state: data.state,
    });
  
    // Check if user with the same email or phone already exists
    try {
      const existingUser = await User.findOne({
        $or: [{ email: newUser.email }, { phone: newUser.phone }],
      });
  
      if (existingUser) {
        return res.status(400).json({ error: 'User already registered' });
      }
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  
  

    try {
        const savedUser = await newUser.save();
      return  res.render('event', { success: true });
      } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Internal server error' });
      }
  };
  


  
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
  

const getUpdatdeUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const oneuser = await User.findById(id).exec();
    res.render('')

      
  }
  catch {

  }
  }


  

module.exports = {
    getAllUsers,
    addUser,
    getAlluserView
}