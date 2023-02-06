const Pool = require("pg").Pool;

const pool = new Pool({
  user: "jsjgbyiwgteaas",
  password: "ce23a0e33256ff48ada51f16faaaa5b3ba4f0e9f32627eb41a8ac232155a6c50",
  host: "ec2-99-80-170-190.eu-west-1.compute.amazonaws.com",
  port: 5432,
  database: "d300somcme3kg0",
  ssl: { rejectUnauthorized: false}
});



module.exports = pool;