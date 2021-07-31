const Pool = require("pg").Pool;

const pool = new Pool({
  user: "umwclojvotmilr",
  password: "f6d873fd333fc8160b810f689d859eb3ee8b85d1fe7a472949f4fb14c9ca6ad8",
  host: "ec2-54-73-147-133.eu-west-1.compute.amazonaws.com",
  port: 5432,
  database: "d2sn9cmc5n693u",
  ssl: { rejectUnauthorized: false}
});



module.exports = pool;
