const express = require("express");
const router = express.Router();
// const pool = require("../../database");
const axios = require('axios')
// const authorization = require("../../middleware/authorization");
// require('dotenv').config();

router.get("/", (req,res) => {

    if (!req.session.isLoggedIn){
        return res.redirect("/signin");
    }

    return res.render("questionscreate.ejs", {successMessage: req.flash("successMessage"), errorMessage: req.flash("errorMessage")})
});

router.post("/", async (req, res) => {
    try {
        const {title, text, keywords} = req.body;

        // var outkeys = keywords.replace(/\s/g, '')

        // outkeys = outkeys.split(",");

        const user_id = req.session.user.id;
        const user_email = req.session.user.email;
        
        // console.log(outkeys);

        axios.post("http://localhost:7000/createquestion",{
            user_id: user_id,
            user_email: user_email,
            title: title,
            text: text,
            keywords: keywords
        })
        .then((response)=>{
            // console.log(response);
            req.flash("successMessage", "Question successfully created")
            return res.redirect("/");

        }, (error) => {
            console.log(error.response.data['Message']);
            // res.status(400).json({ Message: "User with this email already exists" });
            req.flash("errorMessage", error.response.data['Message'])
            return res.redirect("/createquestion");
        });
        

    } catch (e) {
        console.log(e.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;