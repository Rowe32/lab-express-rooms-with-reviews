const router = require("express").Router();
const User = require("../models/User.model");
const bcrypt = require("bcryptjs"); 

/* GET home page */
router.get("/", (req, res) => {
  res.render("index");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body;
  const salt = await bcrypt.genSalt(12);
  const hash = await bcrypt.hash(password, salt);
  const user = {
    fullName: fullName,
    email: email,
    password: hash,
  }

  await User.create(user);
  console.log(user);
  res.redirect("/login");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const loggedUser = await User.findOne({ email : email });
  const checkPassword = await bcrypt.compare(password, loggedUser.password);
  if (checkPassword) {
    req.session.currentUser = loggedUser;
    res.redirect("/profile");
  }
});

module.exports = router;
