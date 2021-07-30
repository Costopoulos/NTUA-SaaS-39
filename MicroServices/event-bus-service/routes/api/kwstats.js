const { default: axios } = require("axios");
const express = require("express");
const router = express.Router();
// const pool = require("../../database");
// const authorization = require("../../middleware/authorization");
// require('dotenv').config();

router.get("/", async (req,res) => {
    
    // const graphkeywords = await pool.query(
    //     "select keyword, counter from (select keyword, count(*) as counter from (select unnest(keywords) as keyword from questions) as g group by keyword) as k order by counter desc limit 5;"
    // )
    try {
        axios.get("http://localhost:4996/statisticsperkeyword")
        .then((response) => {
            // console.log(response.data);
            return res.json(response.data)
        }, (error) => {
            return res.status(400).send(error.response.data);
        })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Event Error");
    }
    

    
});

module.exports = router;