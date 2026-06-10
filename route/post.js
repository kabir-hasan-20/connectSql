const express = require("express");
const router = express.Router();
const post = require("../models/post");
const wrapAsync = require("../utils/wrapAsync");
const{isLogin,isOwner,postValidation} = require("../middleware");

//all post
router.get("/",wrapAsync(async(req,res)=>{
  const [posts] =await post.allPost();
  console.log(posts);
  const [countP] = await post.countAll();
  console.log(countP);
  let likeBool;
  if(req.user){
    [likeBool] = await post.likeBool(req.user.id);
    console.log(likeBool);
    return res.render("post/allPost.ejs",{posts,countP,likeBool});
  }
  console.log(likeBool);
  res.render("post/allPost.ejs",{posts,countP,likeBool});
}));
//create post
router.get("/post/create",isLogin,(req,res)=>{
  res.render("post/creatPost.ejs");
});
router.post("/post/:id",postValidation,wrapAsync(async(req,res)=>{
 
  await post.creatPost(req.body.post,req.params.id);
  req.flash("success","post add successful");
  res.redirect("/");
}));
// update post
router.get("/post/edit/:post_id",wrapAsync(async(req,res)=>{
  const id = req.params.post_id;
  const [p] = await post.findPost(id);
  res.render("post/update.ejs",{p})
}));
router.put("/post/:id",wrapAsync(async(req,res)=>{
  const id = req.params.id;
  const discription = req.body.post.description;
  // console.log(discription,"id:",id);
  await post.updatePost(id,discription);
  res.redirect("/");
}));
// delete
router.delete("/post/:id",isLogin,isOwner,wrapAsync(async(req,res)=>{
  await post.deletePost(req.params.id);
  res.redirect("http://localhost:8080/");
}));
module.exports = router;