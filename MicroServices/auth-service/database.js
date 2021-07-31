const Pool = require("pg").Pool;

const pool = new Pool({
  user: "yscrsqrqrvuzcb",
  password: "5cac20d5345a990c0560563dd9de2af2df83461893588f1c4d5144079e533c88",
  host: "ec2-35-174-122-153.compute-1.amazonaws.com",
  port: 5432,
  database: "dbmes7s4tuvsng",
  ssl: { rejectUnauthorized: false}
});

module.exports = pool;
