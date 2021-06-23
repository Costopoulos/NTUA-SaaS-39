const express = require("express");
const router = express.Router();
const pool = require("../db");
const jwt = require("jsonwebtoken");
require('dotenv').config();

// module.exports = async function(req, res, next){
//     const token = req.header("jwt_token");
//     if (!token) {
//         res.status(403).json({ Message: "Unauthorized" });
//     }
//     try {
//         const tokenisexpired = await pool.query(
//             "SELECT token_id FROM expired_tokens WHERE token_id = $1",
//             [token]
//         )
//         if (tokenisexpired.rows[0]) res.status(200).json({Message: "Token already expired"});
        
//         const verify = jwt.verify(token, process.env.jwtSecret);
//         req.user = verify.user;
//         next();
//     } catch (err) {
//         res.status(401).json({ Message: "Not valid token" });
//     }
// };

module.exports = async function(req, res, next){
    if (!req.session.isLoggedIn){
        return res.redirect("/signin");
    }
    return;
};
