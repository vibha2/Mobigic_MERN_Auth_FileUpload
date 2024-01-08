const User = require("../models/user");
const OTP = require("../models/otp");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const mailSender = require("../utils/mailSender");
// const { passwordUpdated } = require("../mail/template/passwordUpdate");
// const Profile = require("../models/Profile");
require("dotenv").config();

//sendOTP for email verification
exports.sendOTP = async (req, res) => {
  try {
    //fetch email from request body
    const { email } = req.body;

    //check if user already exist
    const user = await User.findOne({ email });

    console.log("email =>", req.body);
    console.log("user =>", user);

    //if user already exit, then return a response
    if (user.isVerified) {
      return res.status(401).json({
        success: false,
        message: "User already registered",
      });
    }

    //generate otp
    var otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    //it includes only number
    console.log("OTP generated: ", otp);

    //check if unique otp or not
    let result = await OTP.findOne({ otp: otp });

    //if not unique, then generate otp again
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      // result = await OTP.findOne({otp: otp});
    }

    //now we've generated unique otp, now insert into db

    const otpPayload = { email, otp };

    //create an entry for DB
    const otpBody = await OTP.create(otpPayload);
    console.log("otpBody=> ", otpBody);

    //return response successful
    res.status(200).json({
      success: true,
      message: "OTP sent Successfully",
      otp,
    });
  } catch (error) {
    console.log("error: ", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//signup
exports.signUp = async (req, res) => {
  try {
    //de-struct data from request body
    console.log("signup user =>", req.body);
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    //validate the data
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      return res.status(403).json({
        success: false,
        message: "All fields are required",
      });
    }

    //2 password match karo
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message:
          "Password and Confirm Password value does not match, please try again",
      });
    }

    //check user already exist or not
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User is already registered",
      });
    }

    //find most recent otp stored for the user
    // createdAt:-1 sorting by descending order
    // const recentOtp = await OTP.find({ email })
    //   .sort({ createdAt: -1 })
    //   .limit(1);
    // console.log("recentOtp=> ", recentOtp);

    // if (recentOtp.length === 0) {
    //   //OTP not found
    //   return res.status(400).json({
    //     success: false,
    //     message: "OTP not found",
    //   });
    // } else if (otp !== recentOtp[0].otp) {
    //   //Invalid OTP
    //   return res.status(400).json({
    //     success: false,
    //     message: "Invalid OTP",
    //   });
    // }

    //Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    //Create the user
    let approved = "";
    approved === "Intructor" ? (approved = false) : (approved = true);

    //Create the Additional Profile for User
    // const profileDetails = await Profile.create({
    //   gender: null,
    //   dateOfBirth: null,
    //   about: null,
    //   contactNumber: null,
    // });

    //entry create in DB
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      accountType: "Member",
      approved: approved,
    });

    //return response
    return res.status(200).json({
      success: true,
      message: "User is registered successfully",
      user,
    });
  } catch (error) {
    console.log("error=> ", error);
    return res.status(500).json({
      success: false,
      message: "User cannot be registered. Please try again",
    });
  }
};

exports.verifyEmailOTP = async (req, res) => {
  try {
    //de-struct data from request body
    const { email, otp } = req.body;
    console.log("req.body =>", req.body);
    //validate the data
    if (!email || !otp) {
      return res.status(403).json({
        success: false,
        message: "All fields are required",
      });
    }

    //find most recent otp stored for the user
    // createdAt:-1 sorting by descending order
    const recentOtp = await OTP.find({ email })
      .sort({ createdAt: -1 })
      .limit(1);
    console.log("recentOtp=> ", recentOtp);

    if (recentOtp.length === 0) {
      //OTP not found
      return res.status(400).json({
        success: false,
        message: "OTP not found",
      });
    } else if (otp !== recentOtp[0].otp) {
      //Invalid OTP
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    //Create the user
    let approved = "";
    approved === "Intructor" ? (approved = false) : (approved = true);

    //Create the Additional Profile for User
    // const profileDetails = await Profile.create({
    //   gender: null,
    //   dateOfBirth: null,
    //   about: null,
    //   contactNumber: null,
    // });

    //update User with isEmailVerified
    console.log("OTP verified");
    // const user = await User.findByIdAndUpdate({email}, {

    // //entry create in DB
    // const user = await User.create({
    //   firstName,
    //   lastName,
    //   email,
    //   contactNumber,
    //   password: hashedPassword,
    //   accountType: accountType,
    //   approved: approved,
    //   additionalDetails: profileDetails._id,
    //   image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
    // });

    //return response
    return res.status(200).json({
      success: true,
      message: "OTP verified successfully",
    });
  } catch (error) {
    console.log("error=> ", error);
    return res.status(500).json({
      success: false,
      message: "Email can't be verified. Please try again",
    });
  }
};

//login
exports.login = async (req, res) => {
  try {
    //get data from req body
    const { email, password } = req.body;

    //validation data
    if (!email || !password) {
      return res.status(403).json({
        success: false,
        message: "All fields are required, please try again",
      });
    }

    //user check exist or not
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User is not registered, Please Signup first",
      });
    }

    //generate JWT, after pasword matching
    if (await bcrypt.compare(password, user.password)) {
      const payload = {
        email: user.email,
        id: user._id,
        accountType: user.accountType,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });
      user.token = token;
      user.password = undefined;

      //create cookie and send response
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        //3 days
        httpOnly: true,
      };
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: "Logged in Successfully",
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Password is incorrect",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Login Failure, please try again",
    });
  }
};

//getUserForVerification
exports.getUserById = async (req, res) => {
  try {
    //get data from req body
    const userId = req.params.userId;

    //validation data
    if (!userId) {
      return res.status(403).json({
        success: false,
        message: "userId is required, please try again",
      });
    }

    //user check exist or not
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User is not registered, Please Signup first",
      });
    }

    res.status(200).json({
      success: true,
      user,
      message: "User details fetched",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Fetching user details failed, please try again",
    });
  }
};

//changePassword
// exports.changePassword = async (req, res) => {
//   try {
//     // Get user data from req.user
//     const userDetails = await User.findById(req.user.id);

//     //Get old  password, newpassword, and confirm new password from req.body
//     const { oldPassword, newPassword, confirmNewPassword } = req.body;

//     // Validate old password
//     const isPasswordMatch = await bcrypt.compare(
//       oldPassword,
//       userDetails.password
//     );

//     if (!isPasswordMatch) {
//       // If old password does not match, return a 401 (Unauthorized) error
//       return res
//         .status(401)
//         .json({ success: false, message: "The password is incorrect" });
//     }
//     //Match newpassword and confirm new password
//     //validation
//     if (newPassword !== confirmNewPassword) {
//       return res.status(403).json({
//         success: false,
//         message: "Please Enter Same Password",
//       });
//     }

//     //update password in DB
//     const hashedPassword = await bcrypt.hash(newPassword, 10);
//     const updatedUserDetails = await User.findOneAndUpdate(
//       req.user.id,
//       {
//         password: hashedPassword,
//       },
//       {
//         new: true,
//       }
//     );

//     //Send notification email
//     try {
//       const emailResponse = await mailSender(
//         updatedUserDetails.email,
//         passwordUpdated(
//           updatedUserDetails.email,
//           `Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
//         )
//       );
//       console.log("Email sent successfully:", emailResponse.response);
//     } catch (error) {
//       // If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
//       console.error("Error occurred while sending email:", error);
//       return res.status(500).json({
//         success: false,
//         message: "Error occurred while sending email",
//         error: error.message,
//       });
//     }

//     //return response
//     return res.status(200).json({
//       success: true,
//       message: "You have changed password successfully",
//     });
//   } catch (error) {
//     // If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
//     console.error("Error occurred while updating password:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Error occurred while updating password",
//       error: error.message,
//     });
//   }
// };
