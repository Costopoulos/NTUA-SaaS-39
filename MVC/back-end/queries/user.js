const User = require("../models/user").getModel();

exports.getUserById = (userId) =>
  User.findOne({
    where: { userId },
  });

exports.getUserByEmail = (email) =>
  User.findOne({
    where: { email },
  });
