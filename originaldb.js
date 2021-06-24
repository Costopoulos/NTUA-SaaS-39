const Pool = require("pg").Pool;

// const pool = new Pool({
//   user: "postgres",
//   password: "68709900",
//   host: "localhost",
//   port: 5432,
//   database: "soa_db",
// });

const pool = new Pool({
  user: "urpisvtgytavek",
  password: "f2a3abd7d2c0566e916516bb702af3c6fd6076f6249b756f7639323712a8cfde",
  host: "ec2-3-212-75-25.compute-1.amazonaws.com",
  port: 5432,
  database: "d8vre040lu8r33",
  ssl: { rejectUnauthorized: false}
});



module.exports = pool;
