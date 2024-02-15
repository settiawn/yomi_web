const { verifyToken } = require("../helpers/jwt");
const { User, Profile, List } = require("../models/index");

const authentication = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) throw { name: "InvalidToken" };

    const [type, token] = authorization.split(" ");
    if (type !== "Bearer") throw { name: "InvalidToken" };

    const verified = verifyToken(token);
    const user = await User.findByPk(verified.id);
    const profile = await Profile.findOne({where: {userId: user.id}});

    req.user = user;
    req.profile = profile;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { authentication };
