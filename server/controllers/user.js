const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { User, Profile } = require("../models/index");

module.exports = class UserController {
  static async register(req, res, next) {
    try {
      const { email, password } = req.body;
      const { id } = await User.create({ email, password });
      res.status(201).json({ id });
    } catch (error) {
      next(error);
    }
  }
  
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) throw { name: "EmailRequired" };
      if (!password) throw { name: "PasswordRequired" };

      const user = await User.findOne({ where: { email } });
      if (!user) throw { name: "InvalidUser" };

      const comparePass = comparePassword(password, user.password);
      if (!comparePass) throw { name: "InvalidUser" };

      //auto make profile when first time login
      const profile = await Profile.findOne({ where: { userId: user.id } });
      if(!profile) await Profile.create({userId: user.id})

      const access_token = signToken({ id: user.id });
      res.status(200).json({ access_token });
    } catch (error) {
      next(error);
    }
  }
};
