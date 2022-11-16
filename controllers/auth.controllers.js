const User = require("../models/User.model");
const bcryptjs = require('bcryptjs');

const signupGetController =  (req, res, next) => {
    res.render('signup.hbs');
  };

  const signupPostController = (req, res, next) => {
    console.log(req.body);
    if(!req.body.username || !req.body.password){
      res.send('sorry u forgot something');
      return;
  }
  User.findOne({ username: req.body.username })
    .then(foundUser => {
      if(foundUser){
        res.send('user already exists');
        return;
      }
  
      const myHashedPassword = bcryptjs.hashSync(req.body.password);
  
      return User.create({
        username: req.body.username,
        password: myHashedPassword
      })
    })
  
    .then(createdUser => {
      res.send(createdUser);
    })
    .catch(err => {
      res.send(err);
    });
  };

  const loginGetController = (req, res, next) => {
    console.log(req.body)
    res.render('login.hbs');
  };

  const loginPostController = (req, res, next) => {
    console.log(req.body);

    const { username, password } = req.body

    if(!username || !password){
        res.render('login.hbs', { errorMessage: 'Forgot username or password'});
        return;
    }

    User.findOne({ username })
        .then(foundUser => {
           

            if(!foundUser){
                // res.send('Sorry user does not exist');
                res.render('login.hbs', { errorMessage: 'Sorry user does not exist' });
                return;
            }

            const isValidPassword = bcryptjs.compareSync(password, foundUser.password)

            if(!isValidPassword){
                // res.send('Sorry wrong password');
                res.render('login.hbs', { errorMessage: 'Sorry wrong password'});
                return;
            }

            req.session.user = foundUser;

            res.render('profile.hbs', foundUser);

        })
        .catch(err => {
            console.log(err);
            res.send(err);
        })

  };

const profileGetController = (req, res, next) => {
    console.log(req.session);
    res.render('profile.hbs', req.session.user);
}

  module.exports = {
    signupGetController,
    signupPostController,
    loginGetController,
    loginPostController,
    profileGetController
  };