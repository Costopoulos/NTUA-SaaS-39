const express = require("express");
const router = express.Router();
const pool = require("../../database");

router.get("/", async (req,res) => {

    try {
        const allquestions = await pool.query(
            "SELECT question_id,user_id,user_email,title,question_text,keywords,to_char(asken_on, 'HH24:MI TZ') as asken_on FROM questions;"
        );

        // console.log(allquestions.rows);

        // console.log(res.json(allquestions));
  
        return res.json(allquestions.rows)

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error");
    }
    

});

router.get("/:id", async (req,res) => {

    const question_id = req.params.id;

    try {
        const allquestions = await pool.query(
            "SELECT * FROM questions WHERE question_id=$1;",
            [question_id]
        );

        // console.log(allquestions.rows);

        // console.log(res.json(allquestions));
  
        return res.json(allquestions.rows[0])

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error");
    }
    

});


module.exports = router;