const { default: axios } = require("axios");
const express = require("express");
const router = express.Router();
const pool = require("../../database");
// const authorization = require("../../middleware/authorization");
// require('dotenv').config();

router.get("/", async (req,res) => {
    try {
        // const myquestions = await pool.query(
        //     "SELECT COUNT(*) FROM questions WHERE user_id = $1",
        //     [req.session.user.id]
        // )

        // const myanswers = await pool.query(
        //     "SELECT COUNT(*) FROM answers WHERE user_id = $1",
        //     [req.session.user.id]
        // )

        // const myquestionstoday = await pool.query(
        //     "SELECT COUNT(*) FROM questions WHERE user_id = $1 AND asken_on >= NOW() - interval '24 hours'",
        //     [req.session.user.id]
        // )

        // const myanswerstoday = await pool.query(
        //     "SELECT COUNT(*) FROM answers WHERE user_id = $1 AND answered_on >= NOW() - interval '24 hours'",
        //     [req.session.user.id]
        // )
        const user_id = req.session.user.id
        axios.post("http://localhost:7000/dashboard/", {
            user_id: user_id
        })
        .then((response)=>{
              console.log(response);
            // console.log(response.data.allquestions);
            return res.render("dashboard.ejs", {questionscount: response.data.questionscount, answerscount: response.data.answerscount, questionscounttoday: response.data.questionscounttoday, answerscounttoday: response.data.answerscounttoday, successMessage: req.flash("successMessage"), errorMessage: req.flash("errorMessage")})
        
            }, (error) => {
                console.error(error.message);
                res.status(500).send("Client Error");
            });

        

    } catch (error) {
        return res.redirect("/")
    }
    
});

module.exports = router;