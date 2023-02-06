const Pool = require("pg").Pool;

const pool = new Pool({
  user: "qbdthljsvrvznk",
  password: "d9957a53da8135dbd0374b520218709aa1e4e28d2a5c5ede94b0f38611980b53",
  host: "ec2-34-247-72-29.eu-west-1.compute.amazonaws.com",
  port: 5432,
  database: "dfasf294n2dgi",
  ssl: { rejectUnauthorized: false}
});



module.exports = pool;
