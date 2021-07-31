const express = require("express");
const router = express.Router();
// const pool = require("../../database");
const { default: axios } = require("axios");
// const authorization = require("../../middleware/authorization");
// require('dotenv').config();

router.get("/", async (req,res) => {

    try {
        axios.get("https://mss-event-bus-saas39.herokuapp.com/statisticsperperiod")
        .then((response) => {
            console.log(response.data);
            return res.render("kwperiod.ejs", {day1: response.data.day1, day2: response.data.day2,day3: response.data.day3,day4: response.data.day4,day5: response.data.day5,day6: response.data.day6,day7: response.data.day7, successMessage: req.flash("successMessage"), errorMessage: req.flash("errorMessage")})
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