//import packages
const express = require("express");
const database = require("./config/database");
const cookieParser = require("cookie-parser");
const Cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

//import routes
const authRoutes = require("./routes/auth");

//PORT declaration
const PORT = process.env.PORT || 4000;

const app = express();

//database connect
database.connect();

//middlewares
app.use(express.json());
// app.use(cookieParser());
// app.use(
//   cors({
//     origin: `http://192.168.29.240:${process.env.CLIENT_PORT}`,
//     credentials: true,
//   })
// );
app.use(Cors());

// app.use(
//   fileUpload({
//     useTempFiles: true,
//     tempFileDir: "/tmp",
//   })
// );

//cloudinary connection
// cloudinaryConnect();

//routes
app.use("/api/v1/auth", authRoutes);

//default route
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is up and running....",
  });
});

//activate the server
app.listen(PORT, () => {
  console.log(`App is running at ${PORT}`);
});
