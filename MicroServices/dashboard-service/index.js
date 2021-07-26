const express = require("express");
const app = express();


//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Dashboard
app.use("/dashboard", require('./routes/api/profile.js'))


//Port
const port = process.env.PORT || 4995;
app.listen(port, () => {
  console.log(`server has started at port ${port}`);
});