const Pool = require("pg").Pool;

const pool = new Pool({
  user: "lhyisfyhrhwwtz",
  password: "350e151d21dd39d50bc734946690e264142abc5f6174b9225b3fefb0b9c51a73",
  host: "ec2-52-6-77-239.compute-1.amazonaws.com",
  port: 5432,
  database: "ddn187pgbiruo",
  ssl: { rejectUnauthorized: false}
});



module.exports = pool;