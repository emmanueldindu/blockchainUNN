const express = require('express')
const bodyParser = require('body-parser')
const error = require('./error')
const ejs = require('ejs')
const nodemailer = require('nodemailer')
const mongoose = require("mongoose")
const urlencodedParser = bodyParser.urlencoded({extended:false})
const app = express()
const port = 5000
const connectDB = require('./db')
const userRoutes = require('./routes/routes')
const session = require('express-session')
const bcrypt = require('bcrypt')
const { addUser } = require('./controller/registerController')
const User = require('./models/user')
const passport = require('passport')
const cors = require('cors')



// middleware



//testing new commit
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  res.setHeader('Expires', '0');
  res.setHeader('Pragma', 'no-cache');
  next();
});


app.use(cors())

app.use(express.static('view'))
app.use('/view/css', express.static(__dirname + 'view/css'))
app.use('/view/js', express.static(__dirname + 'view/js'))
app.use('/view/images', express.static(__dirname + 'view/images'))
app.use('/view/fonts', express.static(__dirname + 'view/fonts'))

app.set('views', './view')
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(error)
app.use(userRoutes.routes)

// app.use(session({
//     secret: 'your-secret-key',
//     resave: false,
//     saveUninitialized: false
// }));

// app.use(passport.initialize());
// app.use(passport.session());

// const users = [
//     {
//       id: 1,
//       username: 'admin',
//       password: 'admin'
//     }
//   ];
  
//   // Local strategy setup
//   const LocalStrategy = require('passport-local').Strategy;
//   passport.use(new LocalStrategy((username, password, done) => {
//     const user = users.find(u => u.username === username);
//     if (!user) {
//       return done(null, false, { message: 'Incorrect username' });
//     }
  
//     bcrypt.compare(password, user.password, (err, result) => {
//       if (err) {
//         return done(err);
//       }
  
//       if (!result) {
//         return done(null, false, { message: 'Incorrect password' });
//       }
  
//       return done(null, user);
//     });
//   }));
  
//   // Serialization and deserialization
//   passport.serializeUser((user, done) => {
//     done(null, user.id);
//   });
  
//   passport.deserializeUser((id, done) => {
//     const user = users.find(u => u.id === id);
//     done(null, user);
//   });
  
//   // Middleware to check if user is authenticated
//   function isAuthenticated(req, res, next) {
//     if (req.isAuthenticated()) {
//       return next();
//     }
//     res.redirect('/login');
// }
  

  
//   // Login route
//   app.get('/login', (req, res) => {
//     res.render('login');
//   });
  
// app.post('/login', (req, res, next) => {
      
//     // console.log('Login route reached');
//     const username = req.body.name;
//     const password = req.body.pwd;
  
//     const user = users.find(u => u.username === username);
//   if (!user || user.password !== password) {
//     return res.render('login', { message: 'Incorrect username or password' });
//   }

//   req.login(user, (err) => {
//     if (err) {
//       return next(err);
//     }

//     return res.redirect('/admin');
//   });
// });



  // Admin route (protected)
  // app.get('/admin', isAuthenticated, (req, res) => {
  //   res.render('team');
  // });
  




app.get('/', (req, res) => {
    res.render('index')
})

app.get('/index', (req, res) => {
    res.render('index')
})

app.get('/event', (req, res) => {
    res.render('event')
})

app.get('/team', (req, res) => {
  res.render('team')
})

app.get('/about', (req, res) => {
  res.render('about')
})
app.get('/success', (req, res) => {
  res.render('success')
})

//get all user or data
app.get('/api/data', async (req, res) => {
  try {
    const data = await User.find().exec();
    res.json(data);
  } catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).json({ error: 'Failed to retrieve data' });
  }
});



//add a user
app.post('/api/user', async (req, res) => {
  try {
    const newUser = await User.create(req.body)
    
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Failed to create user' });

  }
})


//update
app.put('/api/users/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).exec();
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
});

//delete
app.delete('api/users/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id).exec();
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({message: 'User deleted successfully'})
    
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Failed to delete user' });
  }
})




//comit



const start = async () => {
    try {
        await connectDB()
        app.listen(port, () => console.log(`Blockchain running on Port ${port}`))
        if(connectDB)
console.log('connected to MongoDB!')
    } catch (error) {
        console.log(error)


    }
}


start()