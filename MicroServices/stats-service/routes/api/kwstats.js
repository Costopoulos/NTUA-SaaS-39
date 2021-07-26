  
const express = require("express");
const router = express.Router();
const pool = require("../../database");

router.get("/", async (req,res) => {

    
    const graphkeywords = await pool.query(
        "select keyword, counter from (select keyword, count(*) as counter from (select unnest(keywords) as keyword from questions) as g group by keyword) as k order by counter desc limit 5;"
    )

    return res.json({graphkeywords});
});

module.exports = router;