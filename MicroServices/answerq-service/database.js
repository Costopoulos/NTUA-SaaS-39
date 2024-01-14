const Pool = require("pg").Pool;

const pool = new Pool({
  user: "tsljtfeuhktiyq",
  password: "43bc79f7d6c5862b8fa8291efda5e6e8c336a13ec81e603d62af15031b392507",
  host: "ec2-54-155-46-64.eu-west-1.compute.amazonaws.com",
  port: 5432,
  database: "d6p0pafqlpv73l",
  ssl: { rejectUnauthorized: false}
});



module.exports = pool;