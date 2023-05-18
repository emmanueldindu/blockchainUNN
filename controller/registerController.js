const User  = require('../models/user');
const Joi = require('joi');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer')




// const sendEmail = async (email, subject, message) => {



//   const transporter = nodemailer.createTransport({

//     service: 'gmail',

//     auth: {
//       user: 'blockchainunnorg@gmail.com',
//       pass: 'gblbrdxbaihkqnsw',

//     },

//   })

//   const mailOptions = {
//     from: 'blockchainunnorg@gmail.com',
//     to: email,
//     subject: 'Thank You for registering for blockchainUNN2.0',
//     text: `Thank you for registering bla bla bla`

    
//   }
  

//   try {
//     await transporter.sendMail(mailOptions)
//     console.log('mail sent successfully')
//   } catch (error) {
//     console.error(error)
//   }


// }




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


    fullname: data.fullname, // Updated to 'fullname'
    email: data.email,
    phone: data.phone,
    gender: data.gender, // Update with the appropriate property name from your data object
    career: data.career,
    student: data.student, // Update with the appropriate property name from your data object
    residence: data.residence,
    attend: data.attend // Update with the appropriate property name from your data object
    
    
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
    const to = req.body.email;
    const name = req.body.fullname;
  
    const transporter = nodemailer.createTransport({
      name: 'blockchainunn.org',
      host: 'smtp.titan.email',
      port: 465,
      secure: true,
      auth: {
        user: 'admin@blockchainUNN.org',
        pass: 'BlockchainUNN&2022',
      },
      tls: {
        ciphers: 'TLSv1.2'
      }
    });
  
    transporter
      .verify()
      .then(() => {
        console.log('SMTP connection established securely');
        const mailConfig = {
          from: 'admin@blockchainUNN.org',
          to: to,
          subject: `Hello ${name}!!!!`,
          html: `
            <p>Congratulations, you have just secured your spot for the biggest blockchain conference in South East Nigeria.</p>
            <p>We can't wait to see you at the conference.</p>
            <p> Join our WhatsApp and Telegram groups to meet and network with other tech enthusiasts like you. https://blockchainunn.org/index.html#comm</p>
          `
        };
  
        transporter.sendMail(mailConfig, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log('Mail sent');
          }
        });
      })
      .catch((error) => {
        console.error('SMTP connection error:', error);
      });
  } catch (error) {
    console.log(error);
  }
  
  
  
 

  try {
    const savedUser = await newUser.save();
      

    return res.render('success');
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
  ;
  


  
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