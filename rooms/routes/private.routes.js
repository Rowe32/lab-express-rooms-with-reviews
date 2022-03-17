const router = require("express").Router();
const User = require("../models/User.model");
const bcrypt = require("bcryptjs"); 
const requireLogin = require("../middleware/routeGuard");

// once I have additional route files, reference routes in app.js !

router.use(requireLogin);

router.get("/profile", (req, res) => {
  res.render('profile', {user: req.session.currentUser});
})

router.get("/main", (req, res) => {
    res.render('main');
  })

router.get("/private", (req, res) => {
res.render('private');
})

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return next(err);

    res.redirect("/login");
  })
})
  
module.exports = router;