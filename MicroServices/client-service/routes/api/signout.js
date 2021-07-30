const express = require("express");
const router = express.Router();
// const pool = require("../../database");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
const authorization = require("../../middleware/authorization");
const axios = require('axios')
require("dotenv").config();

//ROUTER

// router.post("/", async (req, res) => {
//   try {
//     const token = req.header("jwt_token");
//     if (!token) {
//       res.status(403).json({ Message: "Unauthorized" });
//     }
//     // if (verify.exp < 2) {
//     //     res.status(403).json({ Message: "Unauthorized" });
//     // }

//     let verify = jwt.verify(token, process.env.jwtSecret);
//     //console.log(verify);
//     req.user = verify.user;
//     //console.log(verify['exp']);
//     verify.exp = 1;
//     console.log(verify);
//     //next();
//     res.status(200).json({Message: "User successfully deleted!"});
//     //token = jwt.sign(token, process.env.jwtSecret, {expiresIn: 1})

//   } catch (err) {
//     res.status(401).json({ Message: "Not valid token" });
//   }
// });

// router.get("/", (req,res) => {
//     if (req.session.isLoggedIn){
//         return res.render("home.ejs");
//     }
//     return res.redirect("/signin");
// });

// router.get('/', function(req, res) {
//     console.log(req.session);
//     req.session.isLoggedIn = false;
//     req.session.destroy(function(err){
//        if(err){
//           console.log(err);
//        }else{
//         //    console.log(session.email);
//         //    req.end();
//            res.redirect('/signin');
//        }
//     });
// });


// router.post("/", authorization, async (req, res) => {
 
//     const inserttoken = await pool.query(
//                 "INSERT INTO expired_tokens (token_id) VALUES ($1) RETURNING *",
//                 [token]
//     )
//     res.status(200).json({Message: "Logged out successfully"});
    
// });

router.post('/', (req,res) => {
    // if (!req.session.user.token) return res.redirect("/")
    try {
        const token = req.session.user.token;

        // console.log("client "+token);
    
        axios.post("http://localhost:7000/signout",{
            token: token
        })
        .then((response)=>{
            req.session.destroy((err) => {
                if (err) throw err;
                // res.status(200).send(response.data)
                console.log(response.data);
                res.redirect('/signin');
            });
        }, (error) => {
            if (error.response.data['Message'] === "Token Already Expired"){
                req.session.destroy((err) => {
                    if (err) throw err;
                    // res.status(200).send(response.data)
                    // console.log(response.data);
                    return res.redirect('/signin');
                });
            }
            return res.status(400).send(error.response.data);
        });

    } catch (error) {
        return res.redirect("/")
    }
    

    // try {
    //     req.session.destroy();
    //     res.redirect('/signin');
        
    // } catch (error) {
    //     console.log(error.message);
    //     res.status(500).send("Server Error");
    // }
});

module.exports = router;
