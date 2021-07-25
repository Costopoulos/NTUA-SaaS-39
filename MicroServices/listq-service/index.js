const express = require("express");
const app = express();


//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//List Questions
app.use("/listquestions", require("./routes/api/questionslist.js"));

//Answer Questions
app.use("/answerquestion", require("./routes/api/questionsanswer.js"));

//Port
const port = process.env.PORT || 4998;
app.listen(port, () => {
  console.log(`server has started at port ${port}`);
});