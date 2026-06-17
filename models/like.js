const db = require("../database/db");

module.exports.findLike = (post_id,user_id)=>{
  return db.query(
    `SELECT * FROM likes WHERE post_id=? AND user_id=?`,
    [post_id,user_id]
  );
};

module.exports.addOne = (post_id,user_id)=>{
  return db.query(
    `INSERT INTO likes(post_id,user_id) VALUES(?,?)`,
    [post_id,user_id]
  );
};

module.exports.removeOne = (post_id,user_id)=>{
  return db.query(
    `DELETE FROM likes WHERE post_id=? AND user_id=?`,
    [post_id,user_id]
  );
};

module.exports.countLike = (post_id)=>{
  return db.query(
    `SELECT COUNT(*) AS total FROM likes WHERE post_id=?`,
    [post_id]
  );
};