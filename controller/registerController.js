const User = require('../models/user');
const Dev = require('../models/dev')
const Cont = require('../models/cont')
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
          subject:'Successfull Registration!',
          html: `
          <div style="text-align: center; color: black;">
          <img src="https://blockchainunn.org/images/navLogo.png" alt="Company Logo" style="max-width: 200px;">
        </div>
        
        <div style="font-size: 16px; line-height: 1.5; color: black;">
          <h1 style="font-size: 25px">Hello ${name}</h1>
          <p style="margin-top: 20px;">We are happy to receive your registration for the <strong>BlockchainUNN Conference 2.0</strong>, holding from <strong>June 23rd to June 24th</strong>. We can't wait to see you there!</p>
          <p style="margin-top: 20px;">We have created a WhatsApp group for event attendees. Join in <a href="https://chat.whatsapp.com/JUugJbtG8f31AyoUnH7EEs">here</a> if you haven't.</p>
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

const getAllDev = async (req, res, next) => {
  const list = await Dev.find().exec()
  
}
  
// const getAllDevView = (reeq, res, next) => {
//     res.render('')
//   }

const addDev = async (req, res, next) => {
  const data = req.body;

  delete data.register;

  const { error } = validateUser(data);
  if (error) {
    return res.send('<script>alert("Fill all the  required fields");</script>');
  }
  
  const newDev = new Dev({

    fullname: data.fullname, // Updated to 'fullname'
    email: data.email,
    phone: data.phone,
    gender: data.gender, // Update with the appropriate property name from your data object
    interest: data.interest,
    student: data.student,
    institution: data.institutuion,
    knowledge: data.knowledge,
    rate: data.rate,
    hours: data.hours


 
  });
  //


  try {
    const existingDev = await Dev.findOne({
      $or: [{ email: newDev.email }, { phone: newDev.phone }],
    });
  
    if (existingDev) {
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
          subject:'Successfull Registration!',
          html: `
          <div style="text-align: center; color: black;">
          <img src="https://blockchainunn.org/images/navLogo.png" alt="Company Logo" style="max-width: 200px;">
        </div>
        
        <div style="font-size: 16px; line-height: 1.5; color: black;">
          <h1 style="font-size: 25px">Hello ${name}</h1>
          <p style="margin-top: 20px;"> Congratulations on successfully registering for the  <strong>BlockchainUNN Dev Bootcamp</strong></p>
          <p styles="margin-top: 20px;">Join our <a href="https://chat.whatsapp.com/FdZgaB32LwG9ycUPs2sAet
          ">whatsapp</a> group for updates, resources, and networking.   </p>


          

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
    const savedDev = await newDev.save();
      

    return res.render('devsucess');
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
  
  function validateUser(data) {
    const schema = Joi.object({
    fullname: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    gender: Joi.string().valid('Male', 'Female').required(),
    interest: Joi.string().valid('Web 2', 'Web 3').required(),
    student: Joi.string().valid('Yes', 'No').required(),
    institution: Joi.string().valid('UNN/NSUKKA', 'UNN/UNEC', 'Others', 'I am not a student').required(),
        knowledge: Joi.string().valid('Yes', 'No').required(),
        rate: Joi.string().valid('0 - First encounter was at the conference', '10-30 - Know a thing or two about it', '40-70 - Pretty knowledgeable about it', '80-100 - Im very knowledgeable about it').required(),
      hours: Joi.string().valid('10 hours', '15 hours', '20 hours', '30 hours').required()
    
    });
  
    return schema.validate(data);
  }
  

}





const getAllCont = async (req, res, next) => {
  const list = await Cont.find().exec()
  
}
  
// const getAllDevView = (reeq, res, next) => {
//     res.render('')
//   }

const addCont = async (req, res, next) => {
  const data = req.body;

  delete data.register;

  const { error } = validateUser(data);
  if (error) {
    return res.send('<script>alert("Fill all the  required fields");</script>');
  
  }
  
  const newCont = new Cont({

    fullname: data.fullname, // Updated to 'fullname'
    email: data.email,
    phone: data.phone,
    gender: data.gender, // Update with the appropriate property name from your data object
    
    student: data.student,
    institution: data.institutuion,
    
    rate: data.rate,
    hours: data.hours


 
  });
  //


  try {
    const existingCont = await Cont.findOne({
      $or: [{ email: newCont.email }, { phone: newCont.phone }],
    });
  
    if (existingCont) {
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
          subject:'Successfull Registration!',
          html: `
          <div style="text-align: center; color: black;">
          <img src="https://blockchainunn.org/images/navLogo.png" alt="Company Logo" style="max-width: 200px;">
        </div>
        
        <div style="font-size: 16px; line-height: 1.5; color: black;">
        <h1 style="font-size: 25px">Hello ${name}</h1>
        <p style="margin-top: 20px;"> Congratulations on successfully registering for the  <strong>BlockchainUNN Content Writing Bootcamp</strong></p>
        <p styles="margin-top: 20px;">Join our <a href="https://chat.whatsapp.com/C5mja01szD7GZ76CxQPlWy ">whatsapp</a> group for updates, resources, and networking.   </p>


        

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
    const savedCont = await newCont.save();
      

    return res.render('contsuccess');
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
  
  function validateUser(data) {
    const schema = Joi.object({
    fullname: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    gender: Joi.string().valid('Male', 'Female').required(),
   
    student: Joi.string().valid('Yes', 'No').required(),
    institution: Joi.string().valid('UNN/NSUKKA', 'UNN/UNEC', 'Others', 'I am not a student').required(),
        
        rate: Joi.string().valid('0 - First encounter was at the conference', '10-30 - Know a thing or two about it', '40-70 - Pretty knowledgeable about it', '80-100 - Im very knowledgeable about it').required(),
      hours: Joi.string().valid('10 hours', '15 hours', '20 hours', ).required()
    
    });
  
    return schema.validate(data);
  }
  

}



  

module.exports = {
    getAllUsers,
    addUser,
  getAlluserView,
  getAllDev,
  addDev,
  getAllCont,
  addCont
    
}