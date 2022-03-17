const router = require("express").Router();
const User = require("../models/User.model");
const bcrypt = require("bcryptjs"); 
const requireLogin = require("../middleware/routeGuard");
const Room = require("../models/room.model");

router.use(requireLogin);

router.get("/profile", (req, res) => {
  res.render('profile', { user: req.session.currentUser });
})

router.get("/allRooms", (req, res) => {
    res.render('room-views/allRooms');
  })

router.get("/createRoom", (req, res) => {
res.render('room-views/createRoom');
})

router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return next(err);

    res.redirect("/login");
  })
})
  
module.exports = router;