const express = require("express");
const router = express.Router();
const pool = require("../../database")

router.post("/", async (req, res) => {
    try {

        const {user_id} = req.body;

        // console.log(user_id);

        if (user_id.length === 0){
            return res.status(400).json({Message: "Fill all fields!"})
        }

        // console.log(answertext)

        // const questionid = req.params.id;

        // const user_id = req.session.user.id;

        var newanswer = await pool.query(
            "INSERT INTO answers(user_id) VALUES ($1);",
            [user_id]
        )

        return res.json({Message: "Answer Successfully Submitted"});

    } catch (e) {
        console.log(e.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;