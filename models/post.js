const db = require("../database/db");
module.exports.creatPost = (post, id) => {
  return db.query(
    `insert into post(id,discription)
    values(?,?)`,
    [
      id,
      post.discription
    ]
  );
}

module.exports.allPost = () => {
  return db.query(
    `select discription,username,create_at,post_id,user.id from post
     join user 
     on post.id=user.id`
  );
};
module.exports.countAll = ()=>{
  return db.query(
    `
  select post.post_id,count(like_id) as countPost from post
     left join likes
     on post.post_id=likes.post_id
     group by post.post_id
  `
  );
};
module.exports.likeBool=(id)=>{
  return db.query(
    `
      select user.id,likes.like_id,likes.post_id from user
     left join likes
     on user.id=likes.user_id
     having user.id=?;
    `,
    [id]
  );
};
module.exports.findPost = (id) => {
  return db.query(
    `select * from post where post_id = ?`,
    [id]
  );
};

module.exports.updatePost = (id, discription) => {
  return db.query(
    `update post
    set discription=?
    where post_id=?`,
    [discription, id]
  );
};

module.exports.deletePost = (id) => {
  return db.query(
    `delete from post
  where post_id=?`,
    [id]
  );
};
module.exports.findID=(post_id)=>{
  return db.query(
    `select * from post
    where post_id=?`,
    [post_id]
  );
};

module.exports.findbyOne = (id)=>{
  return db.query(
    `select user.id,post.post_id,comment_id,comment.create_at,username,discription,comment from comment
    join post 
    on comment.post_id = post.post_id
    join user
    on comment.user_id = user.id
    where post.post_id=?`,
    [id]
  );
};