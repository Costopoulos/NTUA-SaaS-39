const express = require("express");
const router = express.Router();
const pool = require("../../db");
const authorization = require("../../middleware/authorization");
require('dotenv').config();

router.get("/", async (req,res) => {

    // const graph = await pool.query(
    //     "SELECT title, count(*) FROM questions WHERE asken_on >= NOW() - interval '1 week' GROUP BY title LIMIT 5;"
    // )

    const day7 = await pool.query(
        "SELECT count(*) FROM questions WHERE asken_on >= NOW() - interval '24 hours';"
    )
    const day6 = await pool.query(
        "SELECT count(*) FROM questions WHERE asken_on >= NOW() - interval '48 hours' and asken_on <= NOW() - interval '1 day';"
    )
    const day5 = await pool.query(
        "SELECT count(*) FROM questions WHERE asken_on >= NOW() - interval '3 days' and asken_on <= NOW() - interval '2 days';"
    )
    const day4 = await pool.query(
        "SELECT count(*) FROM questions WHERE asken_on >= NOW() - interval '4 days' and asken_on <= NOW() - interval '3 days';"
    )
    const day3 = await pool.query(
        "SELECT count(*) FROM questions WHERE asken_on >= NOW() - interval '5 days' and asken_on <= NOW() - interval '4 days';"
    )
    const day2 = await pool.query(
        "SELECT count(*) FROM questions WHERE asken_on >= NOW() - interval '6 days' and asken_on <= NOW() - interval '5 days';"
    )
    const day1 = await pool.query(
        "SELECT count(*) FROM questions WHERE asken_on >= NOW() - interval '1 week' and asken_on <= NOW() - interval '6 days';"
    )

    const lday7 = await pool.query(
        "SELECT EXTRACT(month from NOW()) AS month, EXTRACT(day FROM NOW()) AS day;"
    )
    const lday6 = await pool.query(
        "SELECT EXTRACT(month from NOW() - interval '1 day') AS month, EXTRACT(day FROM NOW() - interval '1 day') AS day;"
    )
    const lday5 = await pool.query(
        "SELECT EXTRACT(month from NOW() - interval '2 days') AS month, EXTRACT(day FROM NOW() - interval '2 days') AS day;"
    )
    const lday4 = await pool.query(
        "SELECT EXTRACT(month from NOW() - interval '3 days') AS month, EXTRACT(day FROM NOW() - interval '3 days') AS day;"
    )
    const lday3 = await pool.query(
        "SELECT EXTRACT(month from NOW() - interval '4 days') AS month, EXTRACT(day FROM NOW() - interval '4 days') AS day;"
    )
    const lday2 = await pool.query(
        "SELECT EXTRACT(month from NOW() - interval '5 days') AS month, EXTRACT(day FROM NOW() - interval '5 days') AS day;"
    )
    const lday1 = await pool.query(
        "SELECT EXTRACT(month from NOW() - interval '6 days') AS month, EXTRACT(day FROM NOW() - interval '6 days') AS day;"
    )

    return res.render("kwperiod.ejs", {day1: day1.rows, day2: day2.rows,day3: day3.rows,day4: day4.rows,day5: day5.rows,day6: day6.rows,day7: day7.rows, lday1: lday1.rows,lday2: lday2.rows,lday3: lday3.rows,lday4: lday4.rows,lday5: lday5.rows,lday6: lday6.rows, lday7:lday7.rows, successMessage: req.flash("successMessage"), errorMessage: req.flash("errorMessage")})
});

module.exports = router;