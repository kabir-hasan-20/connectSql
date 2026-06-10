const express = require("express");
const router = express.Router();
const post = require("../models/post");
const comment = require("../models/comment");
const like = require("../models/like");
const wrapAsync = require("../utils/wrapAsync");
const{isLogin,isOwnerComment} = require("../middleware");
// router.post("/like/:post_id",isLogin,wrapAsync(async(req,res)=>{

//   let val = 0;

//   const [likeinfo] = await like.findLike(
//     req.params.post_id,
//     req.user.id
//   );

//   if(likeinfo.length){

//     await like.removOne(
//       req.params.post_id,
//       req.user.id
//     );

//     val = -1;

//   }else{

//     await like.addOne(
//       req.params.post_id,
//       req.user.id
//     );

//     val = 1;
//   }

//   res.json({
//     success:true,
//     val
//   });

// }));
router.post("/like/:post_id", isLogin, async (req,res)=>{

  const post_id = req.params.post_id;
  const user_id = req.user.id;

  const [likeinfo] = await like.findLike(post_id,user_id);

  let liked = false;

  if(likeinfo.length){

    await like.removeOne(post_id,user_id);

  }else{

    await like.addOne(post_id,user_id);
    liked = true;
  }

  const [count] = await like.countLike(post_id);

  res.json({
    liked,
    totalLikes: count[0].total
  });

});
module.exports = router;