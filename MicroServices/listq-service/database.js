const Pool = require("pg").Pool;

const pool = new Pool({
  user: "izqtjnrbacksrb",
  password: "8cb7487c2fa74658a6243e9ea6eaa7f8f7046bf49a0d89c20aa9f8f20e05225e",
  host: "ec2-54-220-170-192.eu-west-1.compute.amazonaws.com",
  port: 5432,
  database: "d4938lv5385mvo",
  ssl: { rejectUnauthorized: false}
});



module.exports = pool;