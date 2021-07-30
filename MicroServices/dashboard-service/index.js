const express = require("express");
const app = express();


//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Dashboard
app.use("/dashboard", require('./routes/api/profile.js'))

//Create Question
app.use("/createquestion", require("./routes/api/questionscreate.js"));

//Create Answer
app.use("/answerquestion", require("./routes/api/questionsanswer.js"));

//Port
const port = process.env.PORT || 4995;
app.listen(port, () => {
  console.log(`Dashboard Service has started at port ${port}`);
});