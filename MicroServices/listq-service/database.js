const Pool = require("pg").Pool;

const pool = new Pool({
  user: "ovafwlvdgpdapa",
  password: "01bc177daf73599021bf573914da666eb4f1d7d60b132c0e362a98fb178454e2",
  host: "ec2-34-250-252-161.eu-west-1.compute.amazonaws.com",
  port: 5432,
  database: "d8dkqtg1sie0sb",
  ssl: { rejectUnauthorized: false}
});



module.exports = pool;