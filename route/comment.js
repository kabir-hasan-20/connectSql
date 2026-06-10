const express = require("express");
const router = express.Router();
const post = require("../models/post");
const comment = require("../models/comment");
const wrapAsync = require("../utils/wrapAsync");
const{isLogin,isOwnerComment} = require("../middleware");
//comment
//create commetn
router.post("/comment/create/:post_id",isLogin,wrapAsync(async(req,res)=>{
  const post_id = req.params.post_id;
  const user_id = req.user.id;
  const com = req.body.comment;
  await comment.InsertVlaue(post_id,user_id,com);
  req.flash("success","comment add successful");
  res.redirect(`/comment/${post_id}`);
  
}));
//show all
router.get("/comment/:id",wrapAsync(async(req,res)=>{
  // console.log(req.params.id," ");
  let [p] = await post.findbyOne(req.params.id);
  let [single] = await post.findID(req.params.id);
  
  // console.log(p," ",single);
  // res.send("hell0");
  return res.render("comment/allComment.ejs",{p,single});
  
}));
//edit from
router.post("/comment/edit/:comment_id",wrapAsync(async(req,res)=>{
  const [com] = await comment.findOnebyID(req.params.comment_id);
  res.render("comment/edit.ejs",{com});
}));
//edit
router.put("/comment/edit/:comment_id/:post_id",wrapAsync(async(req,res)=>{
  // console.log(req.params.comment_id);
  // console.log(req.body.comment);
  await comment.editComment(req.params.comment_id,req.body.comment);
  req.flash("success","Edit comment successful");
  res.redirect(`/comment/${req.params.post_id}`);
}));
//delet comment
router.delete("/comment/:comment_id/:post_id/:user_id",isLogin,isOwnerComment,wrapAsync(async(req,res)=>{
  await comment.DeleteComment(req.params.comment_id);
  req.flash("success","Delete comment successful");
  res.redirect(`/comment/${req.params.post_id}`);
}));
module.exports = router;