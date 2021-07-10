const express = require("express");
const router = express.Router();
const pool = require("../../database.js");
const authorization = require("../../middleware/authorization");
require("dotenv").config();


router.post("/", authorization, async (req, res) => {

    const inserttoken = await pool.query(
        "INSERT INTO expired_tokens (token_id) VALUES ($1) RETURNING *",
        [token]
    )
    res.status(200).json({Message: "Successfully logged out"});
});

module.exports = router;
