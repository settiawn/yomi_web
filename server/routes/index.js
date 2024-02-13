const express = require("express");
const UserController = require("../controllers/user");
const Controller = require("../controllers");
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
router.get("/index", Controller.index);

//add to the list by the manga id => axios by manga id to get the coverId as well
router.post("/index/:mangaId", Controller.addList);

//authorization
//edit the list (comment+rating)
router.put("/mylist/:listId", Controller.editProfile);

//authorization
//delete the list
router.delete("/mylist/:listId", Controller.editList);

//fetch profile by id (public) + ada list nya juga
router.get("/profile/:id", Controller.index);

//authorization
//edit profile (ava, bio, etc)
router.put("/profile/:id", Controller.index);



module.exports = router;
