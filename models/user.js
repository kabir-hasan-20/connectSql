const db = require("../database/db");
module.exports.getstudent= ()=>{
  return db.query(
    `select * from student`
  );
};

module.exports.deletVal =(id)=>{
  return db.query(
    `delete from student where id = ?`,
    [id]
  );
};
module.exports.all = ()=>{
  return db.query(
    `select * from user`
  );
};

module.exports.signup = async(username,email,password)=>{

  const [result] = await db.query(
    `insert into user(username,email,password)
     values(?,?,?)`,
    [username,email,password]
  );

  const [rows] = await db.query(
    `select * from user where id=?`,
    [result.insertId]
  );

  return rows[0];
};
module.exports.userinfo = (user_id)=>{
  return db.query(
    `select * from user
    where id=?`,
    [user_id]
  );
};
module.exports.userAllPost=(user_id)=>{
  return db.query(
    `
    select * from post
    where id=?
    `,[user_id]
  );
};
module.exports.inserImage = (user_id,imag)=>{
  return db.query(
    `
      update user
      set profile_img=?
      where id=?
    `,
    [imag,user_id]
  );
};