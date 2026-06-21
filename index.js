const express = require("express");
const app = express();
const path = require("path");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));

const ejsMate = require('ejs-mate');
require('dotenv').config();
app.engine('ejs', ejsMate);
const methodOverride = require('method-override');
app.use(methodOverride("_method"));
const bcrypt = require("bcrypt");
const passport = require("./database/passport");

const postRoute = require("./route/post");
const userRoute = require("./route/user");
const commentRoute = require("./route/comment");
const likeRoute = require("./route/like");

const session = require("express-session");
const flash = require("connect-flash");
const sessionOpation = {
  secret: process.env.SESSION_SECRET, // This is required for signing the session ID cookie
  resave: false,             // Prevents race conditions, typically set to false
  saveUninitialized: false,
  cookie:{
    expires:Date.now()+7*24*60*60*1000,
    maxAge:7*24*60*60*1000,
    httpOnly:true
  }
}
app.use(session(sessionOpation));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
// app.use(session(sessionOpation));
// app.use(flash());

const db = require("./database/db");
const user = require("./models/user");
const post = require("./models/post");
const { getstudent } = require("./models/user");
const wrapAsync = require("./utils/wrapAsync");
const ExpressError = require("./utils/ExpressError");
const {isLogin,isOwner }=require("./middleware");

// app.use(passport.initialize());
app.use(passport.session());
//flash message middleware
app.use((req,res,next)=>{
  res.locals.error =req.flash("error");
  res.locals.success = req.flash("success");
  res.locals.currentUser = req.user;
  next();
})
// show all post
app.use("/",postRoute);
 //user
app.use("/",userRoute);

//comment
app.use("/",commentRoute);
// app.get("/post/comment/:id",async(req,res)=>{
//   let [p] = await post.findbyOne(req.params.id);
//   if(p.length)
//  return res.render("comment/allComment.ejs",{p});
//   const [pi] = await post.findID(req.params.id);
//   p=pi;
//   res.render("comment/allComment.ejs",{p});
// })

// like
app.use("",likeRoute);
app.use((req,res,next)=>{
  next(new ExpressError(404,"Page not found"));
})
app.use((err,req,res,next)=>{
  let{status = 500,message = "Somting Wrong"}=err;
  res.status(status).render("error.ejs",{message});
  console.log(message,"msg");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
   console.log(`Server running on ${PORT}`);
});
