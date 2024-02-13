const { User, Profile, List } = require("../models/index");

const authorizationUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const profile = await Profile.findByPk(id);
    if (!profile) throw { name: "ProfileNotFound" };

    if (req.user.id === profile.userId) {
      next();
    } else {
      throw { name: "Forbidden" };
    }
  } catch (error) {
    next(error);
  }
};

const authorizationProfile = async (req, res, next) => {
  const { listId } = req.params;
  try {
    const list = await List.findByPk(listId);
    if (!list) throw { name: "ListNotFound" };

    if (req.profile.id === list.profileId) {
      next();
    } else {
      throw { name: "Forbidden" };
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { authorizationUser, authorizationProfile };
