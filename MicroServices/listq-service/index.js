const express = require("express");
const app = express();


//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//List Questions
app.use("/listquestions", require("./routes/api/questionslist.js"));

//Post Question
app.use("/createquestion", require("./routes/api/questionscreate.js"));


//Port
const port = process.env.PORT || 4998;
app.listen(port, () => {
  console.log(`List Questions Service has started at port ${port}`);
});