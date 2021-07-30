const express = require("express");
const router = express.Router();
const pool = require("../../database");
// require('dotenv').config();

router.post("/", async (req, res) => {
    try {
        const {user_id} = req.body;

        if (user_id.length === 0){
            return res.status(400).json({Message: "Error in retrieving the keywords"})
        }

        // var outkeys = keywords.replace(/\s/g, '')

        // outkeys = outkeys.split(",");

        var newquestion = await pool.query(
            "INSERT INTO questions(user_id) VALUES ($1) RETURNING *;",
            [user_id]
        )

        return res.json({Message: "Question successfully created for dashboard"});
        

    } catch (e) {
        console.log(e.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;