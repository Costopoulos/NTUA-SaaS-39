const { default: axios } = require("axios");
const { response } = require("express");
const express = require("express");
const router = express.Router();
const pool = require("../../database");
// const authorization = require("../../middleware/authorization");
// require('dotenv').config();

router.get("/:id", async (req,res) => {

    if (!req.session.isLoggedIn){
        return res.redirect("/signin");
    }

    const question_id = req.params.id;

    try {
        let data = []
        let datadict = []
        axios.get(`http://localhost:7000/getonequestion/${question_id}`)
        .then((response)=>{
            // console.log("mia erwthsh "+JSON.stringify(response.data));
            // return res.json({allquestions: response.data})
            // const thequestion = response.data
            data.push(response.data)
            datadict.push({
                key: "question",
                value: response.data
            })
        })
        .then((response) => {
            axios.get(`http://localhost:7000/answerquestion/${question_id}`)
            .then((resp) => {
                // console.log(resp);
                // return resp.data
                data.push(resp.data)
                // console.log(data[0]);
                datadict.push({
                    key: "answers",
                    value: resp.data
                })
            })
            .then((responsara) => {
                // console.log(data);
                // console.log(data1[0]);
                // data.push(responsara)
                // console.log(responsara);
                // console.log(data);
                // console.log("datadict is "+JSON.stringify(datadict));
                // console.log(datadict[1].value.answers)
                // console.log(datadict[1].value.answers)
                res.render("questionsanswer.ejs", {qid: question_id, question: datadict[0].value.question, answers: datadict[1].value.answers, successMessage: req.flash("successMessage"), errorMessage: req.flash("errorMessage")})
            })
        })
        
    
        // }, (error) => {
        //     // console.log(error.response.data['Message']);
        //     console.log(error);
        //     // return res.status(400).send(error.response.data);
        // });

        // // console.log(question);

        // axios.get(`http://localhost:7000/answerquestion/${question_id}`)
        // .then((response)=>{
        //     // console.log("apanthseis "+JSON.stringify(response.data));
        //     // return res.json({allquestions: response.data})

    
        // }, (error) => {
        //     // console.log(error.response.data['Message']);
        //     return res.status(400).send(error.response.data);
        // });

        // axios.all([question,answers]).then(axios.spread((...responses) => {
        //     const response1 = responses[0]
        //     const response2 = responses[1]
        //     return res.render("questionsanswer.ejs", {qid: question_id, question: question, answers: answers.rows, successMessage: req.flash("successMessage"), errorMessage: req.flash("errorMessage")})
        // })).catch(error => {
        //     console.log(error);
        // })

        // // return res.render("questionsanswer.ejs", {qid: question_id, question: question.rows[0], answers: answers.rows, successMessage: req.flash("successMessage"), errorMessage: req.flash("errorMessage")})
    
        // console.log(JSON.stringify(question));
        // const sela = await Promise.all([question,answers])
        // .then((response => {
        // //   console.log(response);
        //     // console.log(sela);
        //     return res.render("questionsanswer.ejs", {qid: question_id, question: question, answers: answers.rows, successMessage: req.flash("successMessage"), errorMessage: req.flash("errorMessage")})
        // }), (error) => {
        // //   console.log(error);
        //   return res.status(400).send(error.response.data);
        // })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Client Error");
    }
    

    
});

router.post("/:id", async (req, res) => {
    try {
        const answertext = req.body.text;

        // console.log(answertext)

        const user_email = req.session.user.email

        const question_id = req.params.id;

        const user_id = req.session.user.id;

        axios.post(`http://localhost:7000/answerquestion/${question_id}`,{
            user_id: user_id,
            user_email: user_email,
            answertext: answertext
        })
        .then((response) => {
            // console.log("edw den eimai?");
            req.flash("successMessage", "Answer successfully submitted");
            return res.redirect(`/answerquestion/${question_id}`);
        }, (error) => {
            req.flash("errorMessage", error.response.data['Message'])
            return res.redirect(`/answerquestion/${question_id}`);
        }) 

        // var newanswer = await pool.query(
        //     "INSERT INTO answers(user_id, question_id, answer_text) VALUES ($1,$2,$3);",
        //     [user_id, questionid, answertext]
        // )

        
    } catch (e) {
        console.log(e.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;