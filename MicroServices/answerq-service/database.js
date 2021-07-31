const Pool = require("pg").Pool;

const pool = new Pool({
  user: "vuirfwqvmmsbmv",
  password: "ae2538a5481ed310c399d474387bf61360ec28caec41862db1d8699b5d246ca2",
  host: "ec2-35-168-145-180.compute-1.amazonaws.com",
  port: 5432,
  database: "d8rlok2n8hb4u2",
  ssl: { rejectUnauthorized: false}
});



module.exports = pool;