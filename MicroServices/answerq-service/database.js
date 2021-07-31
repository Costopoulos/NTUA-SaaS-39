const Pool = require("pg").Pool;

const pool = new Pool({
  user: "rucyqvphhthnkn",
  password: "10562ec40044492d43d7cfc19952defd139aeddef5045e26342e3d103011ccb1",
  host: "ec2-54-73-147-133.eu-west-1.compute.amazonaws.com",
  port: 5432,
  database: "d6l21t8c33mbcu",
  ssl: { rejectUnauthorized: false}
});



module.exports = pool;