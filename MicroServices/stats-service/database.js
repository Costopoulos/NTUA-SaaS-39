const Pool = require("pg").Pool;

const pool = new Pool({
  user: "mjpmwtpybcecvd",
  password: "842487045a2f4080bc5f94f10077ad54ef3b82bbb7d395b0f8c17c621deac863",
  host: "ec2-54-155-46-64.eu-west-1.compute.amazonaws.com",
  port: 5432,
  database: "d40615lc0gucoe",
  ssl: { rejectUnauthorized: false}
});



module.exports = pool;