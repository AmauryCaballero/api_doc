const router = require("express").Router();
const { oneOf } = require("express-validator");

const { verifyAuthToken } = require("../middlewares/auth");

const {
  createUserProfileValidator,
  getUserProfileValidator,
  checkUserNameValidator,
  updateUserProfilePicValidator,
  getUsersValidator,
  updateUserProfilePicParams,
  createUserProfileParams,
  getUserProfileParams,
  checkUserNameParams,
  getUsersParams,
} = require("../middlewares/userProfile.js");

const userProfileCtrl = require("../controllers/userProfile");

router.post(
  "/create-profile",
  oneOf(createUserProfileParams),
  createUserProfileValidator,
  userProfileCtrl.createUserProfile
);

router.patch(
  "/update-user-profile",
  oneOf(updateUserProfilePicParams),
  updateUserProfilePicValidator,
  userProfileCtrl.updateUserProfile
);

router.get(
  "/get-user-profile",
  oneOf(getUserProfileParams),
  getUserProfileValidator,
  userProfileCtrl.getUserProfile
);

router.get(
  "/check-user-name",
  oneOf(checkUserNameParams),
  checkUserNameValidator,
  userProfileCtrl.checkUserName
);

router.get(
  "/get-users",
  oneOf(getUsersParams),
  getUsersValidator,
  userProfileCtrl.getUsers
);

module.exports = router;