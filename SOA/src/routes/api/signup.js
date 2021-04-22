const express = require("express");
const router = express.Router();
const pool = require("../../db");
const bcrypt = require("bcryptjs");
//const { genSalt } = require("bcrypt");

//ROUTER

//THIS

// router.post("/", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const newUser = await pool.query(
//       "INSERT INTO mvcuser (email, password) VALUES ($1, $2) RETURNING *",
//       [email, password]
//     );
//     res.json(newUser.rows[0]);
//   } catch (err) {
//     res.status(400).json({ Message: "User already exists" });
//   }
// });

// bcrypt.genSalt(10).then(result => { //genSalt generates a hash of 10 digits
//     let password1 = bcrypt.hash(password, result)
// }).then(password1 => {
//     const newUser = pool.query(
//         "INSERT INTO mvcuser (email, password) VALUES ($1, $2) RETURNING *",
//         [email, password1]
//     )

// }).then(res.json(newUser.rows[0]))

// const salt = bcrypt.genSalt();
// let password1 = bcrypt.hash(password, salt);

//   const newUser = await pool.query(
//     `INSERT INTO mvcuser (email, password) VALUES (${email}, crypt:(${password}, gen_salt('bf', 8))`
//   );
//   res.json(newUser.rows[0]);

//THIS

// router.post("/", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const salt = await bcrypt.genSalt();
//     console.log(salt);
//     let password1 = await bcrypt.hash(password, salt);
//     //console.log(password1);
//     const newUser = await pool.query(
//       "INSERT INTO mvcuser (email, password) VALUES ($1, $2) RETURNING *",
//       [email, password1]
//     );
//     // console.log()
//     res.json(newUser.rows[0]);
//   } catch (err) {
//     res.status(400).json({ Message: "User already exists" });
//   }
// });

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    const salt = await bcrypt.genSalt();
    const sela = await Promise.all([bcrypt.hash(password, salt)]);
    const newUser = await pool.query(
      "INSERT INTO soauser (email, password) VALUES ($1, $2) RETURNING *",
      [email, sela[0]]
    );

    res.json(newUser.rows[0]);
  } catch (err) {
    res.status(400).json({ Message: "User with this email already exists" });
  }
});

module.exports = router;

// const newUser = await pool.query(
//     "INSERT INTO mvcuser (email, password) VALUES ($1, $2) RETURNING *",
//     [email, password1]
// )
