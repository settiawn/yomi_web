const { User, Profile, List } = require("../models/index");

const editProfile = async (req, res, next) => {
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

const editEntry = async (req, res, next) => {
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

const checkDuplicateAndStatus = async (req, res, next) => {
  const { mangaId } = req.params;
  console.log(req.profile.id);
  console.log(req.profile.status);

  try {
    const duplicateEntry = await List.findAll({
      where: { profileId: req.profile.id, mangaId },
    });
    if (duplicateEntry.length !== 0) throw { name: "EntryDuplicate" };

    const ListCounter = await List.count({
      where: { profileId: req.profile.id },
    });
    console.log(ListCounter);
    switch (req.profile.status) {
      case "normal":
        if (ListCounter > 5) throw { name: "UpgradeRequired" };
        break;
      case "supporter":
        if (ListCounter > 10) throw { name: "MaximumReached" };
        break;
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  editProfile,
  editEntry,
  checkDuplicateAndStatus,
};
