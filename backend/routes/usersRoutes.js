const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const User = require("../models/user.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const router = express.Router();
const userController=require("../controllers/user.js")

router.route("/signup")
.get(userController.renderSignupForm )
.post(
  wrapAsync(userController.createReview)
);



router.route("/login")
.get(userController.renderLoginForm)
.post(
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  userController.afterLogin
);

router.get("/logout", userController.logout);
module.exports = router;
