const express = require("express");
const UserController = require("../controllers/user");
const Controller = require("../controllers");
const { authentication } = require("../middlewares/authentication");
const { authorizationUser, authorizationProfile } = require("../middlewares/authorization");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("hello yomi");
});

//register & login
router.post("/register", UserController.register);
router.post("/login", UserController.login);

//auth
//narik dari axios
//home/list of entity. use query, filter, etc on this
// router.get("/index", Controller.index);

router.get("/profile/:id", Controller.showProfile);
//fetch profile by id (public) + ada list nya juga

router.use(authentication)

//authorization
//edit profile (ava, bio, etc)
router.put("/profile/:id", authorizationUser, Controller.editProfile);

//add to the list by the manga id => axios by manga id to get the coverId as well (validasi dari api mangadex ada atau gak)
router.post("/index/:mangaId", Controller.addList);

//authorization
//edit the list (comment+rating)
router.put("/mylist/:listId", authorizationProfile, Controller.editList);

//authorization
//delete the list
router.delete("/mylist/:listId", authorizationProfile, Controller.deleteList);



module.exports = router;
