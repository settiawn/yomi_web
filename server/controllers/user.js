const { comparePassword } = require("../helpers/bcrypt");
const { signToken, verifyToken } = require("../helpers/jwt");
const { User, Profile } = require("../models/index");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client();

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
      if (!profile) await Profile.create({ userId: user.id });

      const access_token = signToken({ id: user.id });
      res.status(200).json({ access_token });
    } catch (error) {
      next(error);
    }
  }

  static async googleLogin(req, res, next) {
    try {
      const ticket = await client.verifyIdToken({
        idToken: req.headers["google_token"],
        audience: process.env.GOOGLE_CLIENT_ID
          
        //TODO => masukin ke ENV
      });
      const payload = ticket.getPayload();

      let user = await User.findOne({ where: { email: payload.email } });

      if (!user) {
        user = await User.create({
          email: payload.email,
          password: Date.now() + "&,/|?" + Math.random(),
        });
      }

      const profile = await Profile.findOne({ where: { userId: user.id } });
      if (!profile) await Profile.create({ userId: user.id });

      const access_token = signToken({ id: user.id });
      res.status(200).json({ access_token });
    } catch (error) {
      next(error);
    }
  }

  static async verify(req, res, next){
    try {
      const {token} = req.headers
      const {id} = verifyToken(token);
      if(id !== req.user.id) throw {name: "Forbidden"}
      res.json({message: "OK", userId: req.user.id, profileId: req.profile.id})
    } catch (error) {
      next(error)
    }
  }
};
