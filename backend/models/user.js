const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    accountType: {
      type: String,
      enum: ["Admin", "Member"],
      required: true,
    },
    // active: {
    //   type: Boolean,
    //   default: true,
    // },
    isVerified: {
      type: Boolean,
      default: false,
    },
    // additionalDetails: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    //   ref: "Profile",
    // },
    // courses: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Course",
    //   },
    // ],
    // image: {
    //   type: String,
    //   required: true,
    // },
    token: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
    },
    // courseProgress: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "CourseProgress",
    //   },
    // ],

    //Add timestamp for when the document is created and last modified
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
