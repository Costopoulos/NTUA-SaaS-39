const pool = require("../database.js");
const jwt = require("jsonwebtoken");
require('dotenv').config();

module.exports = async function(req, res, next){
    const token = req.header("jwt_token");

    // const token = req.body

    // console.log(req.header("jwt_token"));
    // console.log("middleware "+token);
    if (!token) {
        res.status(403).json({ Message: "Unauthorized" });
    }
    try {
        const tokenisexpired = await pool.query(
            "SELECT token_id FROM expired_tokens WHERE token_id = $1",
            [token]
        )
        if (tokenisexpired.rows[0]) res.status(200).json({Message: "Token already expired"});
        
        const verify = jwt.verify(token, process.env.jwtSecret);
        req.user = verify.user;
        next();
    } catch (err) {
        res.status(401).json({ Message: "Invalid token" });
    }
};