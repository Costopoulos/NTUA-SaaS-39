const Pool = require("pg").Pool;

const pool = new Pool({
  user: "dcyfemwoeqbjko",
  password: "92e6990f69a796240972cc1063b1d51a22bf33304445864a85d28484d654efa1",
  host: "ec2-52-30-67-143.eu-west-1.compute.amazonaws.com",
  port: 5432,
  database: "d5qjkgkd12c240",
  ssl: { rejectUnauthorized: false}
});

module.exports = pool;
