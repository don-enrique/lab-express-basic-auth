const User = require("../models/User.model");
const bcryptjs = require('bcryptjs');

const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get('/signup', (req, res, next) => {
  res.render('signup.hbs');
});

router.post('/signup', (req, res, next) => {
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
});

module.exports = router;
