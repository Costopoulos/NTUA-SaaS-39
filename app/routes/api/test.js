const express = require("express");
const router = express.Router();
const pool = require("../../db");
const bcrypt = require("bcryptjs");
const { json } = require("express");
require('dotenv').config();

router.get("/", (req,res) => {

    return res.render("test.ejs", {errorMessage: req.flash("successMessage")})
})

module.exports=router;