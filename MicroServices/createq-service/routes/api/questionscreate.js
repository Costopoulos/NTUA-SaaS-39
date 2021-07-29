const express = require("express");
const router = express.Router();
const pool = require("../../database");
// require('dotenv').config();

router.post("/", async (req, res) => {
    try {
        const {user_id, title, text, keywords} = req.body; //user id will be coming from the sessions of the front end

        if (user_id.length === 0 || title.length === 0 || text.length === 0 || keywords.length === 0){
            return res.status(400).json({Message: "Fill all fields!"})
        }

        // var outkeys = keywords.replace(/\s/g, '')

        // outkeys = outkeys.split(",");

        var newquestion = await pool.query(
            "INSERT INTO questions(user_id, title, question_text, keywords) VALUES ($1, $2, $3, $4) RETURNING *;",
            [user_id, title, text, outkeys]
        )

        return res.json({Message: "Question successfully created"});
        

    } catch (e) {
        console.log(e.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;