const express = require("express");
const app = express();


//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Answer Questions
app.use("/answerquestion", require("./routes/api/questionsanswer.js"));

//Port
const port = process.env.PORT || 4997;
app.listen(port, () => {
  console.log(`Answer Service has started at port ${port}`);
});