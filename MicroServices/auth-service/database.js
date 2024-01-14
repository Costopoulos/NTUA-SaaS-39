const Pool = require("pg").Pool;

const pool = new Pool({
  user: "lyixxejbcsarkm",
  password: "8f739f33087389a37e37d11116ddb12cf4492aa041f7be9f0bbd1318c2b2e1ad",
  host: "ec2-34-242-199-141.eu-west-1.compute.amazonaws.com",
  port: 5432,
  database: "dddfe30qe27juh",
  ssl: { rejectUnauthorized: false}
});

module.exports = pool;
