const express = require("express");
const router = express.Router();
const pool = require("../../db");
const authorization = require("../../middleware/authorization");
require('dotenv').config();

router.get("/", async (req,res) => {

    // const top5keywords = await pool.query(
    //     "SELECT unnest(keywords) FROM questions;"
    // );
    
    // const kw = await pool.query(
    //     "SELECT * FROM (SELECT unnest(keywords),COUNT(unnest(keywords)) AS counter FROM (SELECT * FROM questions) GROUP BY keywords ORDER BY counter);"
    // )
    
    const graphkeywords = await pool.query(
        "select keyword, counter from (select keyword, count(*) as counter from (select unnest(keywords) as keyword from questions) as g group by keyword) as k order by counter desc limit 5;"
    )

    //select keyword from (select keyword, count(*) as counter from (select unnest(keywords) as keyword from questions) as g group by keyword) as k order by counter desc limit 5;

    // console.log(graphkeywords.rows);

    // console.log(kw);

    // console.log(top5keywords.rows);

    return res.render("kwstats.ejs", {keywords: graphkeywords.rows, successMessage: req.flash("successMessage"), errorMessage: req.flash("errorMessage")})
});

module.exports = router;