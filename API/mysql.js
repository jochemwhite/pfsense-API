import mysql from "mysql2";

const con = mysql.createConnection({
  host: "157.90.198.147",
  user: "Jochem",
  password: "Maxie2001@",
  database: "ROUTER",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

const promisePool = con.promise();
export {con, promisePool}