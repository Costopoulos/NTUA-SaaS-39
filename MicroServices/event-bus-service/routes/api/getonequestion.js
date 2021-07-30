const { default: axios } = require("axios");
const express = require("express");
const router = express.Router();
// const pool = require("../../database");

router.get("/:id", async (req,res) => {

    const question_id = req.params.id

    try {
        axios.get(`http://localhost:4998/listquestions/${question_id}`)
        .then((response) => {
            return res.json({question: response.data})
        }, (error) =>{
            return res.status(400).send(error.response.data);
        }) 

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error");
    }
    

});


module.exports = router;