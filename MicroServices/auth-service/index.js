const express = require("express");
const app = express();
// const cors = require("cors");
require('dotenv').config();


//middleware
// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Signup
app.use("/signup", require("./routes/api/signup.js"));

//Signin
app.use("/signin", require("./routes/api/signin.js"));

//Signout
app.use("/signout", require("./routes/api/signout.js"));

//Port
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Auth Service has started at port ${port}`);
});
