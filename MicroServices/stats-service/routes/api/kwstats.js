const express = require("express");
const router = express.Router();
const pool = require("../../database");

router.get("/", async (req,res) => {
    try {
        const graphkeywords = await pool.query(
            "select keyword, counter from (select keyword, count(*) as counter from (select unnest(keywords) as keyword from questions) as g group by keyword) as k order by counter desc limit 5;"
        );
    
        // console.log(graphkeywords.rows);
    
        return res.json(graphkeywords.rows);

    } catch (error) {
        console.error(err.message);
        res.status(500).send("Statistics Service Error");
    }
    
    
});

module.exports = router;