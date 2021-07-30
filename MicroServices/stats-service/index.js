const express = require("express");
const app = express();


//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Questions per Keyword
app.use("/statisticsperkeyword", require("./routes/api/kwstats.js"))

//Questions per day
app.use("/statisticsperperiod", require("./routes/api/kwperiod.js"))

//Post Question
app.use("/createquestion", require("./routes/api/questionscreate.js"))


//Port
const port = process.env.PORT || 4996;
app.listen(port, () => {
  console.log(`Statistics Service has started at port ${port}`);
});