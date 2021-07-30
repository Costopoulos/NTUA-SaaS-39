const express = require("express");
const router = express.Router();
const pool = require("../../database");


router.post("/", async (req,res) => {
    try {
        const {user_id} = req.body; //header probably
        // console.log(user_id);

        // const user_id = req.header('identify')

        // console.log(user_id);

        // const id = user_id['user_id']

        // console.log(id);

        const myquestions = await pool.query(
            "SELECT COUNT(*) FROM questions WHERE user_id = $1",
            [user_id]
        )

        // console.log(myquestions);

        const myanswers = await pool.query(
            "SELECT COUNT(*) FROM answers WHERE user_id = $1",
            [user_id]
        )

        // console.log(myanswers);

        const myquestionstoday = await pool.query(
            "SELECT COUNT(*) FROM questions WHERE user_id = $1 AND asken_on >= NOW() - interval '24 hours'",
            [user_id]
        )

        // console.log(myquestionstoday);

        const myanswerstoday = await pool.query(
            "SELECT COUNT(*) FROM answers WHERE user_id = $1 AND answered_on >= NOW() - interval '24 hours'",
            [user_id]
        )

        // console.log(myanswerstoday);

        return res.json({questionscount: myquestions.rows[0].count, answerscount: myanswers.rows[0].count, questionscounttoday: myquestionstoday.rows[0].count, answerscounttoday: myanswerstoday.rows[0].count})

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error");
    }
    
});

module.exports = router;