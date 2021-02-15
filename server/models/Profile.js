const mongoose = require("mongoose");

const profileSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    avatar: {
      type: String,
    },
    gender: {
      type: String,
      // required: true,
    },
    profession: {
      type: String,
      // required: true,
    },
    company: {
      type: String,
      // required: true,
    },
    bio: {
      type: String,
      // required: true,
    },
    address: {
      street: {
        type: String,
        // required: true,
      },
      apt: {
        type: String,
        // required: true,
      },
      city: {
        type: String,
        // required: true,
      },
      state: {
        type: String,
        // required: true,
      },
      postalcode: {
        type: String,
        // required: true,
      },
    },
    social: {
      twitter: {
        type: String,
      },
      facebook: {
        type: String,
      },
      linkedin: {
        type: String,
      },
      instagram: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", profileSchema);
