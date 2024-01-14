const Pool = require("pg").Pool;

const pool = new Pool({
  user: "vdtyrrsumcnnri",
  password: "9221a562373ae5743282dbc2efd8ace3663ce12e8869a8e61516d984a7a07c39",
  host: "ec2-34-250-252-161.eu-west-1.compute.amazonaws.com",
  port: 5432,
  database: "d8ro1t0iof1dc1",
  ssl: { rejectUnauthorized: false}
});



module.exports = pool;