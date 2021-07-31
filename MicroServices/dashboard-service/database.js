const Pool = require("pg").Pool;

const pool = new Pool({
  user: "rdonaodfhfvfsr",
  password: "743a9a5edf54aa7171e95eb8e4737856eda2f8a7b60ae2b12bd990a119514855",
  host: "ec2-54-236-137-173.compute-1.amazonaws.com",
  port: 5432,
  database: "d756tuh07o357c",
  ssl: { rejectUnauthorized: false}
});



module.exports = pool;