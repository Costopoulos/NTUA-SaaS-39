const express = require("express");
const router = express.Router();
const pool = require("../../db");
const authorization = require("../../middleware/authorization");
require('dotenv').config();

router.get("/", async (req,res) => {

    if (!req.session.isLoggedIn){
        return res.redirect("/signin");
    }

    const allquestions = await pool.query(
        "SELECT * FROM questions;"
    );

    // const allquestions = "SELECT * FROM questions;";


    console.log(allquestions);

    console.log(allquestions.rows);

    // const sela = ['sela0', 'sela9']

    return res.render("questionslist.ejs", {questions: allquestions.rows, successMessage: req.flash("successMessage"), errorMessage: req.flash("errorMessage")})
});


module.exports = router;