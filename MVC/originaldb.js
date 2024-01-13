const Pool = require("pg").Pool;

const pool = new Pool({
  user: "ixmksqwhfpvate",
  password: "0489bd9e3aa53e9dd1cdd5579892fdbd65e84d953fc3e33c46340ab38fd2c63f",
  host: "ec2-54-155-129-189.eu-west-1.compute.amazonaws.com",
  port: 5432,
  database: "d9uaca0bvb7kng",
  ssl: { rejectUnauthorized: false}
});



module.exports = pool;
