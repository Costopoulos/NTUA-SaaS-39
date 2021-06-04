const express = require("express");
const router = express.Router();
const pool = require("../../db");
const authorization = require("../../middleware/authorization");
require('dotenv').config();

router.get("/", (req,res) => {

    if (!req.session.isLoggedIn){
        return res.redirect("/signin");
    }

    return res.render("questionscreate.ejs", {successMessage: req.flash("successMessage"), errorMessage: req.flash("errorMessage")})
});

router.post("/", async (req, res) => {
    try {
        const {title, text, keywords} = req.body;

        // console.log(`keywords are ${keywords}`);
        // console.log(`keywords type are ${typeof(keywords)}`);

        // var outkeys = keywords.replace(" ", "");
        var outkeys = keywords.replace(/\s/g, '')
        
        // console.log(`outkeys are ${outkeys}`);

        outkeys = outkeys.split(",");

        // console.log(`last outkeys are ${outkeys}`);

        // for (var key in outkeys){
        //     console.log(`key is ${outkeys[key]}`);
        // }

        // var newquestion = await pool.query(
        //     "INSERT INTO questions(title, question_text, keywords) VALUES ($1, $2, $3) RETURNING *;",
        //     [title, text, outoutkeys[0]]
        // )

        var user_id = req.session.user.id;

        var newquestion = await pool.query(
            "INSERT INTO questions(user_id, title, question_text, keywords) VALUES ($1, $2, $3, $4) RETURNING *;",
            [user_id, title, text, outkeys]
        )

        // for (var key in outoutkeys){
        //     var newquestion = await pool.query(
        //         "INSERT INTO questions(title, question_text, keywords) VALUES ($1, $2, $3) RETURNING *;",
        //         [title, text, outoutkeys[key]]
        //     )
        //     // var newquestion = {
        //     //     text: "INSERT INTO questions(title, question_text, keywords) VALUES ($1, $2, $3) RETURNING *",
        //     //     values: [title, text, outoutkeys]
        //     // }
        // }
        

        req.flash("successMessage", "Question successfully created");
        return res.redirect("/");
        

    } catch (e) {
        console.log(e.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;