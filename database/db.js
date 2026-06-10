const mysql = require("mysql2");
require("dotenv").config();
const connection = mysql.createConnection({
   host:process.env.MYSQLHOST,
   user:process.env.MYSQLUSER,
   password:process.env.MYSQLPASSWORD,
   database:process.env.MYSQLDATABASE
});

connection.connect((err)=>{
   if(err){
      console.log(err);
   }
   else{
      console.log("MYSQL CONNECTED");
   }
});

module.exports = connection;