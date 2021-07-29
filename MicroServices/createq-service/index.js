  const express = require("express");
const app = express();
// const cors = require("cors");
// require('dotenv').config();


//middleware
// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Signup
app.use("/createquestion", require("./routes/api/questionscreate.js"));

//Port
const port = process.env.PORT || 4999;
app.listen(port, () => {
  console.log(`Create Questions Service has started at port ${port}`);
});