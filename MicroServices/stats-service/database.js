const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "68709900",
  host: "localhost",
  port: 5432,
  database: "stats_mss",
});



module.exports = pool;