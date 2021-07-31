const Pool = require("pg").Pool;

const pool = new Pool({
  user: "xityqvrswzktsz",
  password: "d179b0fd8761d837d94919a954914f130df4a1294d7ea17796a66f446b4dcca2",
  host: "ec2-54-220-170-192.eu-west-1.compute.amazonaws.com",
  port: 5432,
  database: "d1sl608ocrsoha",
  ssl: { rejectUnauthorized: false}
});

module.exports = pool;
