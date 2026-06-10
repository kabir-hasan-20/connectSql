const { validate } = require("uuid");
const post = require("./models/post");
const{postSchema }=require("./schema");
const ExpressError = require("./utils/ExpressError");
module.exports.isLogin = (req,res,next)=>{

  if(!req.isAuthenticated()){
    req.flash("error","Login first");

    return res.redirect("/login");
  }

  next();
};

module.exports.isOwner = async(req,res,next)=>{

  const post_id = req.params.id;

  const [p] = await post.findID(post_id);

  if(!p.length){
    req.flash("error","Post not found");
    return res.redirect("/");
  }

  if(p[0].id != req.user.id){

    req.flash("error","you not owner this post");

    return res.redirect("/");
  }

  next();
};
module.exports.isOwnerComment = async(req,res,next)=>{
  const user_id = req.params.user_id;
  if(user_id!=req.user.id){
    req.flash("error","you not owner this comment");
    return res.redirect("/");
  }
  next();
}
module.exports.postValidation = (req,res,next)=>{
  let {error}=postSchema.validate(req.body);
  if(error){
    let ErrMsg = error.details.map((el)=>el.message).join(',');
    throw new ExpressError(400,ErrMsg);
  }else{
    next();
  }
}