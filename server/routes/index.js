const express = require("express");
const UserController = require("../controllers/user");
const Controller = require("../controllers");
const { authentication } = require("../middlewares/authentication");
const { editProfile, editEntry, checkDuplicateAndStatus } = require("../middlewares/authorization");
const PaymentController = require("../controllers/payment");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("こんにちは");
});

//register & login
router.post("/register", UserController.register);
router.post("/login", UserController.login);
//google login
router.post("/google-login", UserController.googleLogin);
//fetch profile by id (public) + ada list nya juga
router.get("/profile/:id", Controller.showProfile);

//auth
router.use(authentication)
// Initiate Order ke midtrans
router.get('/payment/midtrans/initiate', PaymentController.initiate)
// endpoint upgrade account
router.patch("/profile/upgrade", Controller.upgrade)
//edit profile (ava, bio, etc)
router.put("/profile/:id", editProfile, Controller.editProfile);
//add to the list by the manga id => axios by manga id to get the coverId as well (validasi dari api mangadex ada atau gak)
router.post("/index/:mangaId", checkDuplicateAndStatus, Controller.addList);
//edit the list (comment+rating)
router.put("/mylist/:listId", editEntry, Controller.editList);
//delete the list
router.delete("/mylist/:listId", editEntry, Controller.deleteList);



module.exports = router;
