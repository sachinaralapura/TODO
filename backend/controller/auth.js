import JWT from "jsonwebtoken";
import { userModel } from "../models/userModel.js";
import bcrypt from "bcrypt";

function genereateToken(user) {
  return JWT.sign(
    {
      _id: user._id,
      email: user.email,
    },
    process.env.ACCESS_TOKEN_SECRET
  );
}

const getAlluser = (req, res) => {
  res.json(users);
};

// --------------------------------------------------------------------

const register = async (req, res) => {
  try {
    // check if the user is already exists
    const user = await userModel.findOne({ email: req.body.email });
    if (user) {
      console.log("user already registered");
      return res.status(403).json({
        message: "This Email already Added!",
      });
    }

    // encrypt the password  and save the user to database
    const salt = bcrypt.genSaltSync();
    const newUser = new userModel({
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, salt),
      userName: req.body.userName,
    });

    const addedUser = await newUser.ave();
    const token = genereateToken(addedUser);
    res.status(200).json({
      token,
      _id: addedUser._id,
      email: addedUser.email,
      userName: addedUser.userName,
    });
  } catch (er) {
    res.status(500).send({
      message: "Internal server error",
    });
  }
};

const login = async (req, res) => {
  try {
    //get the user using the email
    console.log(req.body);
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).send({
        message: "user not found",
      });
    }
    if (!bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(401).send({
        message: "wrong password",
      });
    }
    const token = genereateToken(user);
    res.json({ token, _id: user._id });
  } catch (err) {
    console.log(err);
    return res.status(500);
  }
};

const authenticateToken = (req, res, next) => {
  const { authorization } = req.headers;
  try {
    const token = authorization.split(" ")[1];
    if (token == null) return res.sendStatus(401);
    JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  } catch (err) {
    console.log(err);
    res.Status(500).send({
      message: err,
    });
  }
};

export { getAlluser, login, register, authenticateToken };
