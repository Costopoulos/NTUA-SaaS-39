const express = require("express");
const router = express.Router();
const axios = require("axios")


// router.post("/", authorization, async (req, res) => {

//     const inserttoken = await pool.query(
//         "INSERT INTO expired_tokens (token_id) VALUES ($1) RETURNING *",
//         [token]
//     )
//     res.status(200).json({Message: "Successfully logged out"});
// });

router.post("/", async (req, res) => {
    try {
        let token = req.body.token;
        // console.log("event "+token);
        // token = console.log(token);
        const body = {
            key: "value"
        }
        const head = {
            headers: {
                'jwt_token': token
            }
        }
        axios.post("http://localhost:5000/signout",body,head)
        .then((response)=>{
            // console.log(response);
            return res.status(200).send(response.data);
    
        }, (error) => {
            // console.log(error.response.data['Message']);
            return res.status(400).send(error.response.data);
        });
    
    
        
        // req.flash("successMessage", "Successful Login");
        // return res.redirect("/");
  
  
    } catch (err) {
      //res.status(401).json({ Message: "User with that mail does not exist" });
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });

module.exports = router;
