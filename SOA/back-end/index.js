const express = require("express");
const app = express();
const cors = require("cors");

//middleware
app.use(cors());
app.use(express.json());

////////////////////////////////////////////////      ENDPOINTS      ///////////////////////////////////////////////////////////////////////////////////

//Signup
app.use("/signup", require("./routes/api/signup.js"));

//Signin
app.use("/signin", require('./routes/api/signin.js'));

//Signout
app.use("/signout", require('./routes/api/signout.js'));

//Port
app.listen(5000, () => {
  console.log("server has started at port 5000");
});
