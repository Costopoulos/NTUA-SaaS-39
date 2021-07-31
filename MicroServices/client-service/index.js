const express = require("express");
const app = express();
const cors = require("cors");
// var Sequelize = require("sequelize");
const session = require("express-session");
const pgSession = require("express-pg-session")(session);
const flash = require("connect-flash");
require('dotenv').config();
const sessionPool = require('pg').Pool;






  const sessionDBaccess = new sessionPool({
    user: "postgres",
    password: "68709900",
    host: "localhost",
    port: 5432,
    database: "client_mss"
  });

  
    const sessionConfig = {
      store: new pgSession({
          pool: sessionDBaccess,
          tableName: 'sessions'
      }),
      name: 'SID',
      expire: 24 * 60 * 60 * 1000,
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
      cookie: {
          maxAge: 1000 * 60 * 60 * 24 * 7,
          sameSite: true, //aameSite
          secure: false // ENABLE ONLY ON HTTPS
      }};



//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", "views");
app.use(flash());



app.use(session(sessionConfig));


app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.user = req.session.user;
  next();
});

////////////////////////////////////////////////      ENDPOINTS      ///////////////////////////////////////////////////////////////////////////////////

//Home
app.get("/", (req,res) => {
  return res.render('home.ejs', {successMessage: req.flash("successMessage")});
});

///////////////// AUTH /////////////////////

//Signup
app.use("/signup", require("./routes/api/signup.js"));

//Signin
app.use("/signin", require("./routes/api/signin.js"));

//Signout
app.use("/signout", require("./routes/api/signout.js"));

///////////////// Questions CRUD /////////////////////

//Create Question
app.use("/createquestion", require("./routes/api/questionscreate.js"));

//Read-List Question
app.use("/listquestions", require("./routes/api/questionslist.js"));

//Answer Question
// app.use("/questions/:id", function(req,res){
//   return res.render("questionsanswer.ejs", {question_id: req.params.id})
// })
app.use("/answerquestion", require("./routes/api/questionsanswer.js"))

///////////////// Graphs /////////////////////
    //Signed Out Graphs
//Questions per Keyword
app.use("/statisticsperkeyword", require("./routes/api/kwstats.js"))

//Questions per day
app.use("/statisticsperperiod", require("./routes/api/kwperiod.js"))

//Dashboard
app.use("/dashboard", require('./routes/api/profile.js'))
// app.get("/dashboard", (req,res) => {
//   return res.render('dashboard.ejs', {successMessage: req.flash("successMessage")});
// });

//About
app.get("/about", (req,res) => {
  return res.render('about.ejs');
});

//Contact
app.get("/contact", (req,res) => {
  return res.render('contact.ejs');
});


//Static files
app.use('/static', express.static('media'));

//Port
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Client has started at port ${port}`);
});


