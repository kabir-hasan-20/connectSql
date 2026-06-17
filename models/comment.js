const db = require("../database/db");
module.exports.DeleteComment = (comment_id)=>{
  return db.query(
    `delete from comment
    where comment_id =?`,
    [comment_id]
  );
};
module.exports.InsertVlaue = (post_id,user_id,comment)=>{
  return db.query(
      `insert into comment(comment,post_id,user_id)
       values
       (?,?,?);
      `,
      [comment,post_id,user_id]
  );
};
module.exports.findOnebyID = (comment_id)=>{
  return db.query(
    `select * from comment
    where comment_id=?`,
    [comment_id]
  );
};
module.exports.editComment = (comment_id,comment)=>{
  return db.query(
    `update comment
    set comment=?
    where comment_id=?`,[
      comment,comment_id
    ]
  );
};