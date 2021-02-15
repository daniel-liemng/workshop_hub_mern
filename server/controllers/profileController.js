const Profile = require("../models/Profile");
const User = require("../models/User");
const { cloudinary } = require("../config/cloudinary");

const uploadAvatar = async (req, res) => {
  try {
    const fileStr = req.body.photoData;
    const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: "workshop_hub",
    });
    // console.log(uploadedResponse);
    // console.log("id", req.user);

    const foundUser = await User.findById(req.user.id);

    // console.log("fprofile", foundUser);

    if (!foundUser) {
      return res.status(404).json({ msg: "User Not Found" });
    }

    let profileFields = {};

    profileFields.avatar = uploadedResponse.secure_url;
    profileFields.user = req.user.id;

    let profile = await Profile.findOne({ user: req.user.id });

    if (profile) {
      // Update
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );
    } else {
      // Create
      profile = new Profile(profileFields);

      await profile.save();
    }

    res.json({ profile });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

const getMyProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name"]);

    console.log("Myprofile", profile);

    if (!profile) {
      return res
        .status(400)
        .json({ errors: [{ msg: "There is no profile for this user" }] });
    }

    res.json(profile);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

module.exports = { uploadAvatar, getMyProfile };
