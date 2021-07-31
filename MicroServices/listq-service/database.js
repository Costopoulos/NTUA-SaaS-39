const Pool = require("pg").Pool;

const pool = new Pool({
  user: "lsmukhkghsbqed",
  password: "36aa03b0ca9530ae74104ef7c2f0887351843bd903ec93be5294b6267f662bc9",
  host: "ec2-52-1-20-236.compute-1.amazonaws.com",
  port: 5432,
  database: "diupevu5v20tk",
  ssl: { rejectUnauthorized: false}
});



module.exports = pool;