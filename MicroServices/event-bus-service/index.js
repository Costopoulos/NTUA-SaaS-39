const express = require("express");
const app = express();
const cors = require("cors");

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


///////////////// AUTH /////////////////////

//Signup
app.use("/signup", require("./routes/api/signup.js"));

//Signin
app.use("/signin", require("./routes/api/signin.js"));

//Signout
app.use("/signout", require("./routes/api/signout.js"));

///////////////// Questions CRUD /////////////////////

// //Create Question
app.use("/createquestion", require("./routes/api/questionscreate.js"));

// //Read-List Question
app.use("/listquestions", require("./routes/api/questionslist.js"));

//Get one Question
app.use("/getonequestion", require("./routes/api/getonequestion.js"));

// //Answer Question
app.use("/answerquestion", require("./routes/api/questionsanswer.js"))

// ///////////////// Graphs /////////////////////
//     //Signed Out Graphs
// //Questions per Keyword
app.use("/statisticsperkeyword", require("./routes/api/kwstats.js"))

// //Questions per day
app.use("/statisticsperperiod", require("./routes/api/kwperiod.js"))

// //Dashboard
app.use("/dashboard", require('./routes/api/profile.js'))
// // app.get("/dashboard", (req,res) => {
// //   return res.render('dashboard.ejs', {successMessage: req.flash("successMessage")});
// // });


//Port
const port = process.env.PORT || 7000;
app.listen(port, () => {
  console.log(`Event bus has started at port ${port}`);
});


