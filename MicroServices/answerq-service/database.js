const Pool = require("pg").Pool;

const pool = new Pool({
  user: "wycpqsrjevbhzc",
  password: "f1458bf6f5762c847b11062bb37c4a040e20bbdccbdf667fe215f0b05f9d9679",
  host: "ec2-52-30-67-143.eu-west-1.compute.amazonaws.com",
  port: 5432,
  database: "d8ucha9co2hpsa",
  ssl: { rejectUnauthorized: false}
});



module.exports = pool;