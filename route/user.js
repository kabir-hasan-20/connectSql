const express = require("express");
const router = express.Router({mergeParams:true});
const user = require("../models/user");
const post = require("../models/post");
const wrapAsync = require("../utils/wrapAsync");
const{isLogin,isOwner} = require("../middleware");
const passport = require("../database/passport");
const bcrypt = require("bcrypt");


const multer = require("multer");
const { storage } = require("../cloudeconfig");
const upload = multer({ storage });

//singup from
router.get("/signup",(req,res)=>{
  res.render("user/signup.ejs");
});
// signup
router.post("/signup",wrapAsync(async(req,res)=>{
  let {username,email,password} = req.body;
  
  const hash = await bcrypt.hash(password,10);
  const use = await user.signup(username,email,hash);
  // req.login(use,(err)=>{
  //   if(err){
  //     return res.send(err);
  //   }
  //   req.flash("success","Welcome to blogs apps");
  //   res.redirect("/");
  // });
  req.login(use, (err) => {
  if (err) {
    return res.status(500).send(err.message);
  }

  req.flash("success", "Welcome to blogs apps");
  return res.redirect("/");
});
 
}));

// login from
router.get("/login",(req,res)=>{

  res.render("user/login.ejs");
});
 //login
// router.post(
//   "/login",
//   passport.authenticate("local", {
//     failureRedirect:"/login",
//     failureFlash:true
//   }),
//   (req,res)=>{
//     req.flash("success","Welcome back");
//     res.redirect("/");
//   }
// );
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect:"/login",
    failureFlash:true
  }),
  (req,res)=>{
    req.flash("success","Welcome back");
    res.redirect("/");
  }
);

// logout
router.get("/logout",(req,res)=>{
  req.logout((err)=>{
    if(err){
      return res.send(err);
    }
    req.flash("success","Logout successful");
    res.redirect("/login");
  });
});
// profile
router.get("/profile",isLogin,wrapAsync(async(req,res)=>{
  const user_id = req.user.id;
  const [userInfo] = await user.userinfo(user_id);
  const [userAllPost] = await user.userAllPost(user_id);
  console.log(userAllPost);
  console.log(userInfo);
  res.render("user/profile.ejs",{userInfo,userAllPost});
}));

router.post("/profile/upload/:user_id",upload.single("profile"),wrapAsync(async(req,res)=>{
  let imag = req.file.path;
  await user.inserImage(req.params.user_id,imag);
  res.redirect("/profile");
}));
module.exports = router;

