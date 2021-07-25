const express = require("express");
const router = express.Router();
const pool = require("../../database");

router.get("/", async (req,res) => {

    try {
        const allquestions = await pool.query(
            "SELECT * FROM questions;"
        );

        console.log(allquestions);

        console.log(res.json(allquestions));
        
        return res.json(allquestions)

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error");
    }
    

});


module.exports = router;