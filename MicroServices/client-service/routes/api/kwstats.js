const { default: axios } = require("axios");
const express = require("express");
const router = express.Router();
const pool = require("../../database");
// const authorization = require("../../middleware/authorization");
// require('dotenv').config();

router.get("/", async (req,res) => {
    
    // const graphkeywords = await pool.query(
    //     "select keyword, counter from (select keyword, count(*) as counter from (select unnest(keywords) as keyword from questions) as g group by keyword) as k order by counter desc limit 5;"
    // )
    try {
        axios.get("http://localhost:7000/statisticsperkeyword")
        .then((response) => {
            // console.log(response);
            return res.render("kwstats.ejs", {keywords: response.data, successMessage: req.flash("successMessage"), errorMessage: req.flash("errorMessage")})
        }, (error) => {
            console.log(error);
            return res.status(400).send(error);
        })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
    

    
});

module.exports = router;