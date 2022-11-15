const { Router } = require("express");
const login = require('./controllers/login');
const register = require('./controllers/register');

const router = Router();

router.get("/", (req, res) => {
  res.send("HOLA MUNDO");
});



router.post("/login", login);
router.post("/register", register);

module.exports = router;
