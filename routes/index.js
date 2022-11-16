

const router = require("express").Router();

const { signupGetController,
        signupPostController,
        loginGetController,
        loginPostController,
        profileGetController,
        mainGetController
 } = require('../controllers/auth.controllers');

const {isLoggedIn, isAnon} = require('../middlewares/auth.middlewares');

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get('/signup', isAnon, signupGetController);

router.post('/signup', isAnon, signupPostController);

router.get('/login', isAnon, loginGetController);

router.post('/login', isAnon, loginPostController);

router.get('/private', isLoggedIn, profileGetController);

router.get('/main', isLoggedIn, mainGetController)

router.get('/logout', (req, res, next) => {
  req.session.destroy(() => {
      res.redirect('/')
  });
})

module.exports = router;
