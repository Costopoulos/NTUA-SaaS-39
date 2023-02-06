const Pool = require("pg").Pool;

const pool = new Pool({
  user: "ythzinoncayksi",
  password: "749fe097dd44abbeff7cd517df89d26c31010ea00092ab5d77573e2413df77bf",
  host: "ec2-52-30-67-143.eu-west-1.compute.amazonaws.com",
  port: 5432,
  database: "db55hniak9b5t6",
  ssl: { rejectUnauthorized: false}
});



module.exports = pool;