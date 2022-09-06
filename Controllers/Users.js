import { add_user, get_user, edit_token } from "../Functions/database.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

async function register(req, res) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  const result = await add_user(user);

  const { password, ...data } = await result.toJSON();

  res.send(data);
}

async function login(req, res) {

  console.log(req.body);
  const user = await get_user(req.body.email);

  let email = user[0].email;
  let password = user[0].password;

  if (!user) {
    return res.status(404).send({
      message: "user not found",
    });
  }

  if (!(await bcrypt.compare(req.body.password, password))) {
    return res.status(400).send({
      message: "invalid credentials",
    });
  }

  const token = await jwt.sign({ _id: user._id }, "secret");

  await edit_token(email, token);

  res.cookie("jwt", token, {
    httpOnly: true,
    maxAge: 14400000,
  });

  res.send({
    message: "success",
  });
}

async function user(req, res) {
  try {
    const cook = req.headers.cookie;
    if (cook === undefined) {
      res.status(401).send({ message: "unauthorized" });
    } else {
      console.log(cook);
      const cookie = cook.split("=")[1];
      const claims = jwt.verify(cookie, "secret");

      if (!claims) {
        return res.status(401).send({
          message: "unauthorized",
        });
      }

      // const user = await User.findOne({ _id: claims._id });
      const user = await get_user("j.vanderwit@amrio.nl");
      let token = user[0].token;

      res.send(user);
    }
  } catch (e) {
    console.log(e);
    return res.status(401).send({
      message: "unauthorized",
    });
  }
}

export { register, login, user };
