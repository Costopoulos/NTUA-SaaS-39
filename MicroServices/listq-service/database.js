const Pool = require("pg").Pool;

const pool = new Pool({
  user: "lioboxumgypyeo",
  password: "81eea1adf975df39b082233d03e02f5c967957e5ef793d21a01cd68b8a384f3d",
  host: "ec2-52-30-67-143.eu-west-1.compute.amazonaws.com",
  port: 5432,
  database: "dclsuor8bofgph",
  ssl: { rejectUnauthorized: false}
});



module.exports = pool;