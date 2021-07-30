const express = require("express");
const router = express.Router();
const pool = require("../../database");
// require('dotenv').config();

router.post("/", async (req, res) => {
    try {
        const {keywords} = req.body;

        if (keywords.length === 0){
            return res.status(400).json({Message: "Error in retrieving the keywords"})
        }

        var outkeys = keywords.replace(/\s/g, '')

        outkeys = outkeys.split(",");

        var newquestion = await pool.query(
            "INSERT INTO questions(keywords) VALUES ($1) RETURNING *;",
            [outkeys]
        )

        return res.json({Message: "Question successfully created for stats"});
        

    } catch (e) {
        console.log(e.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;