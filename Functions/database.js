import { con, promisePool } from "../API/mysql.js";

function create_table() {
  let sql = `CREATE TABLE IF NOT EXISTS users (
        id INT NOT NULL AUTO_INCREMENT,
        username VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        PRIMARY KEY (id)
    )`;
  promisePool.query(sql);
}

async function add_user(req, res) {
  const { email, password } = req.body;
  console.log("log from DB");
  console.log(email);

  try {
    await promisePool.query(
      `INSERT INTO users (username, password) VALUES ('${name}', '${password}')`
    );
  } catch (e) {
    if (e.errno == 1062) {
      //   console.log(`User ${user} already exists`);
      return `User ${name} already exists`;
    } else {
      console.log(e);
      return `something went wrong`;
    }
  }
}

async function edit_password(user, password) {
  try {
    await promisePool.query(
      `UPDATE users SET password = '${password}' WHERE username = '${user}'`
    );
  } catch (e) {
    if (e.errno == 1062) {
      //   console.log(`User ${user} already exists`);
      return `User ${user} already exists`;
    }
  }
}

async function edit_token(email, token) {
  try {
    await promisePool.query(
      `UPDATE users SET token = '${token}' WHERE email = '${email}'`
    );
  } catch (e) {
    if (e.errno == 1062) {
      //   console.log(`User ${user} already exists`);
      return `User ${user} already exists`;
    }
  }
}

async function delete_user(user) {
  try {
    await promisePool.query(`DELETE FROM users WHERE username = '${user}'`);
  } catch (e) {
    if (e.errno == 1062) {
      //   console.log(`User ${user} already exists`);
      return `User ${user} already exists`;
    }
  }
}

async function get_user(email) {
  try {
    const [rows, fields] = await promisePool.query(
      `SELECT * FROM users WHERE email = '${email}'`
    );
    return rows;
  } catch (e) {
    if (e.errno == 1062) {
      //   console.log(`User ${user} already exists`);
      return `User ${email} already exists`;
    }
  }
}
async function get_token(email) {
  try {
    const [rows, fields] = await promisePool.query(
      `SELECT token FROM users WHERE email = '${email}'`
    );
    return rows;
  } catch (e) {
    if (e.errno == 1062) {
      //   console.log(`User ${user} already exists`);
      return `User ${email} already exists`;
    }
  }
}

//export all functions
export {
  create_table,
  add_user,
  edit_password,
  edit_token,
  delete_user,
  get_user,
};
