const Pool = require("pg").Pool;

const pool = new Pool({
  user: "ebksgzisrpuuwa",
  password: "9f311045f155b95202bc52305586fbab6f87a415c0acc01c7f3f2e6ea20055ea",
  host: "ec2-54-220-53-223.eu-west-1.compute.amazonaws.com",
  port: 5432,
  database: "d9qvl3hjlbspau",
  ssl: { rejectUnauthorized: false}
});



module.exports = pool;