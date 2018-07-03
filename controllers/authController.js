var User = require("../models/User");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var config = require("../config");

exports.register = async (req, res) => {
  if (req.body["password"] !== req.body["password-confirm"])
    return res.status(500).send("Your passwords did not match.");
  req.body.password.length < 8
    ? res.status(500).send("Password must be at least 8 characters.")
    : null;
  const password = await bcrypt.hash(req.body.password, 12);
  const { name, email } = req.body;
  User.create(
    {
      name,
      email,
      password
    },
    (err, user) => {
      if (err)
        return res
          .status(500)
          .send("There was a problem registering the user.");
      const token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });
      res.status(200).send({ auth: true, token });
    }
  );
};

exports.login = (req, res) => {
  User.findOne({ email: req.body.email }, async (err, user) => {
    if (err) return res.status(500).send("Error on the server.");
    if (!user) return res.status(404).send("No user found.");
    var passwordIsValid = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!passwordIsValid)
      return res.status(401).send({ auth: false, token: null });
    var token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });
    res.status(200).send({ auth: true, token: token });
  });
};

exports.verifyToken = (req, res, next) => {
  var token = req.headers["x-access-token"];
  if (!token)
    return res.status(403).send({ auth: false, message: "No token provided." });
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err)
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });
    req.userId = decoded.id;
    next();
  });
};

exports.getUser = (req, res) => {
  User.findById(req.userId, { password: 0 }, (err, user) => {
    if (err)
      return res.status(500).send("There was a problem finding the user.");
    if (!user) return res.status(404).send("No user found.");
    res.status(200).send(user);
  });
};
