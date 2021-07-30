const { default: axios } = require("axios");
const express = require("express");
const router = express.Router();

router.get("/", async (req,res) => {
    
    try {
        axios.get("http://localhost:4996/statisticsperperiod")
        .then((response) => {
            console.log(response.data);
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