const User  = require('../models/user');
const Joi = require('joi');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer')
const path = require('path');
const fs = require('fs');


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

const imagePath = path.join(__dirname, '..', 'view', 'images', 'logoo.PNG');
const image = fs.readFileSync(imagePath);
const imageBase64 = image.toString('base64');
const imageSrc = `data:image/png;base64,${imageBase64}`;




const getAllUsers = async (req, res, next) => {
    const list = await User.find().exec()

}

const getAlluserView = (req, res, next) => {
    res.render('registered')
}

const addUser = async (req, res, next) => {
  const data = req.body;
  
  delete data.register;
  
  // Validate user object using Joi
  const { error } = validateUser(data);
  if (error) {
    // return res.status(400).json({ error: error.details[0].message });
    return res.send('<script>alert("Fill all the  required fields");</script>');

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
      return res.send('<script>alert("email or phone number has already been used");</script>');
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
          from: 'blockchainUNN <admin@blockchainUNN.org>',
          to: to,
          subject: `Hello, ${name}!`,
          html: `
          <div style="text-align: center;">
          <img src="https://blockchainunn.onrender.com/images/navLogo.png" alt="Company Logo" style="max-width: 200px;">
        </div>
        <div style="font-size: 16px; line-height: 1.5; color: black;">
            <p style="margin-top: 20px;">We are happy to receive your registration for the <strong>BlockchainUNN Conference 2.0</strong>, holding from <strong>June 23rd to June 24th</strong>. We can't wait to see you there!</p>
            <p style="margin-top: 20px;">We have created a WhatsApp group for event attendees. Join in <a href="https://chat.whatsapp.com/Eov8UP1ZBjVCKmqcN0eu6s">here</a> if you haven't.</p>
            <p style="margin-top: 20px;">Ensure to pay close attention to your email, as well as the <a href="https://t.me/BlockchainUNN">telegram community</a>, in order not to miss important updates regarding the event.</p>
            <p style="margin-top: 20px;">
              Telegram: <a href="https://t.me/BlockchainUNN">https://t.me/BlockchainUNN</a><br>
              Twitter: <a href="https://twitter.com/BlockchainUNN">https://twitter.com/BlockchainUNN</a><br>
              Instagram: <a href="https://instagram.com/blockchainunn">https://instagram.com/blockchainunn</a>
            </p>
            <p style="margin-top: 20px;">With Love,</p>
            <p style="margin-top: 10px;">Team, BlockchainUNN.</p>
          </div>
          <hr style="margin-top: 40px; border: none; border-top: 1px solid #ccc;">
          <p style="text-align: center; font-size: 12px; color: #777;">You received this email because we received a request for your registration for the event. If you didn't request registration, you can safely delete this email.</p>
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
        gender: Joi.string().valid('Male', 'Female'),
        career: Joi.string(),
        student: Joi.string().valid('Yes', 'No'),
        residence: Joi.string().valid('UNN/Nsukka', 'UNEC/Enugu', 'Others'),
        attend: Joi.string().valid('Yes', 'No')
      
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
