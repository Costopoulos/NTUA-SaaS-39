const { default: axios } = require("axios");
const express = require("express");
const router = express.Router();
// const pool = require("../../database");
// const authorization = require("../../middleware/authorization");
// require('dotenv').config();

router.post("/", async (req,res) => {
    try {
        const {user_id} = req.body
        axios.post("http://localhost:4995/dashboard/",{
            user_id: user_id
        })
        .then((response)=>{
              console.log(response);
            // console.log(response.data.allquestions);
            return res.json(response.data)
        
            }, (error) => {
                console.log(error);
                return res.status(400).send(error.response.data);
            });

        

    } catch (error) {
        return res.redirect("/")
    }
    
});

module.exports = router;