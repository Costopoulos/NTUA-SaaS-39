const express = require("express");
const router = express.Router();
const pool = require("../../db");
const authorization = require("../../middleware/authorization");
require('dotenv').config();

router.get("/", async (req,res) => {

    const myquestions = await pool.query(
        "SELECT COUNT(*) FROM questions WHERE user_id = $1",
        [req.session.user.id]
    )

    const myanswers = await pool.query(
        "SELECT COUNT(*) FROM answers WHERE user_id = $1",
        [req.session.user.id]
    )

    const myquestionstoday = await pool.query(
        "SELECT COUNT(*) FROM questions WHERE user_id = $1 AND asken_on >= NOW() - interval '24 hours'",
        [req.session.user.id]
    )

    const myanswerstoday = await pool.query(
        "SELECT COUNT(*) FROM answers WHERE user_id = $1 AND answered_on >= NOW() - interval '24 hours'",
        [req.session.user.id]
    )

    return res.render("dashboard.ejs", {questionscount: myquestions.rows[0].count, answerscount: myanswers.rows[0].count, questionscounttoday: myquestionstoday.rows[0].count, answerscounttoday: myanswerstoday.rows[0].count, successMessage: req.flash("successMessage"), errorMessage: req.flash("errorMessage")})
});

module.exports = router;