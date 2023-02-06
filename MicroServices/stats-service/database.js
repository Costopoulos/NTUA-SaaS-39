const Pool = require("pg").Pool;

const pool = new Pool({
  user: "hcudrhjhqxgdvl",
  password: "bda97797bd8b5a8f4ec412b567824f7c38706a8633b91098b8a325aca78bc7cf",
  host: "ec2-52-30-67-143.eu-west-1.compute.amazonaws.com",
  port: 5432,
  database: "d4sv7itns0ic0v",
  ssl: { rejectUnauthorized: false}
});



module.exports = pool;