const db = require("../database/db");
module.exports.getstudent= ()=>{
  return db.promise().query(
    `select * from student`
  );
};

module.exports.deletVal =(id)=>{
  return db.promise().query(
    `delete from student where id = ?`,
    [id]
  );
};
module.exports.all = ()=>{
  return db.promise().query(
    `select * from user`
  );
};

module.exports.signup = async(username,email,password)=>{

  const [result] = await db.promise().query(
    `insert into user(username,email,password)
     values(?,?,?)`,
    [username,email,password]
  );

  const [rows] = await db.promise().query(
    `select * from user where id=?`,
    [result.insertId]
  );

  return rows[0];
};
module.exports.userinfo = (user_id)=>{
  return db.promise().query(
    `select * from user
    where id=?`,
    [user_id]
  );
};
module.exports.userAllPost=(user_id)=>{
  return db.promise().query(
    `
    select * from post
    where id=?
    `,[user_id]
  );
};
module.exports.inserImage = (user_id,imag)=>{
  return db.promise().query(
    `
      update user
      set profile_img=?
      where id=?
    `,
    [imag,user_id]
  );
};