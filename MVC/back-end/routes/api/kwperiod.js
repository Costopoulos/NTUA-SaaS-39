const express = require("express");
const router = express.Router();
const pool = require("../../db");
const authorization = require("../../middleware/authorization");
require('dotenv').config();

router.get("/", async (req,res) => {

    // const graph = await pool.query(
    //     "SELECT title, count(*) FROM questions WHERE asken_on BETWEEN NOW()::DATE-EXTRACT(DOW FROM NOW())::INTEGER-7AND NOW()::DATE-EXTRACT(DOW FROM NOW())::INTEGER GROUP BY title;"
    // )
    const graph = await pool.query(
        "SELECT title, count(*) FROM questions WHERE asken_on >= NOW() - interval '1 week' GROUP BY title LIMIT 5;"
    )

    console.log(graph);

    console.log(graph.rows.length);

    return res.render("kwperiod.ejs", {keywords: graph.rows, successMessage: req.flash("successMessage"), errorMessage: req.flash("errorMessage")})
});

module.exports = router;