const Pool = require("pg").Pool;

const pool = new Pool({
  user: "ltbvlpjezckgvd",
  password: "2ef04af8ee7290df9e9146d75dd7a5eb3b1a01b656b590d67766f5b6bd1268ad",
  host: "ec2-54-216-48-43.eu-west-1.compute.amazonaws.com",
  port: 5432,
  database: "dd7lt56fj09kos",
  ssl: { rejectUnauthorized: false}
});



module.exports = pool;