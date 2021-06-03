const express = require("express");
const app = express();
const cors = require("cors");
const session = require('express-session');
const pool = require("./db");
const flash = require('req-flash');


//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.set("view engine", "ejs")
app.set("views","views")

app.use(session({
  secret: 'sela key that will sign our seletocookie',
  resave: false,
  saveUninitialized: false,
  // save: 
}));

app.use(flash());
// app.use((req,res,next) => {
//   res.locals.isAuthenticated = req.session.isLoggedIn;
// });





////////////////////////////////////////////////      ENDPOINTS      ///////////////////////////////////////////////////////////////////////////////////

//Signup
app.use("/signup", require("./routes/api/signup.js"));

//Signin
app.use("/signin", require('./routes/api/signin.js'));

//Signout
app.use("/signout", require('./routes/api/signout.js'));

app.use("/test", require('./routes/api/test.js'));

//Port
const port = process.env.port || 5000;
app.listen(5000, () => {
  console.log(`server has started at port ${port}`);
});
