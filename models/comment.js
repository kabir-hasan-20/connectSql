const db = require("../database/db");

module.exports.DeleteComment = (comment_id) => {
  return db.query(
    `DELETE FROM comment
     WHERE comment_id = ?`,
    [comment_id]
  );
};

module.exports.InsertVlaue = (post_id, user_id, comment) => {
  return db.query(
    `INSERT INTO comment(comment, post_id, user_id)
     VALUES (?, ?, ?)`,
    [comment, post_id, user_id]
  );
};

module.exports.findOnebyID = (comment_id) => {
  return db.query(
    `SELECT *
     FROM comment
     WHERE comment_id = ?`,
    [comment_id]
  );
};

module.exports.editComment = (comment_id, comment) => {
  return db.query(
    `UPDATE comment
     SET comment = ?
     WHERE comment_id = ?`,
    [comment, comment_id]
  );
};