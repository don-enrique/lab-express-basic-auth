

const router = require("express").Router();

const { signupGetController,
        signupPostController,
        loginGetController,
        loginPostController,
        profileGetController
 } = require('../controllers/auth.controllers');

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get('/signup', signupGetController);

router.post('/signup', signupPostController);

router.get('/login', loginGetController);

router.post('/login', loginPostController);

router.get('/profile', profileGetController);

module.exports = router;
