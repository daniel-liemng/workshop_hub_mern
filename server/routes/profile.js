const profileController = require("../controllers/profileController");
const authProtect = require("../middleware/authMiddleware");

const router = require("express").Router();

router.post("/upload-avatar", authProtect, profileController.uploadAvatar);
router.get("/", authProtect, profileController.getMyProfile);

module.exports = router;
