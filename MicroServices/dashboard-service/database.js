const Pool = require("pg").Pool;

const pool = new Pool({
  user: "jowiotiyyvgmlu",
  password: "e317e879d0d90563eded194c1b629488dcbc09fcd471f8c151a31debc26aed67",
  host: "ec2-54-220-53-223.eu-west-1.compute.amazonaws.com",
  port: 5432,
  database: "dedlhegsq1d85s",
  ssl: { rejectUnauthorized: false}
});



module.exports = pool;